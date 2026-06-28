import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  onValue,
  get,
  set,
  remove
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const ADMIN_EMAIL = "anubhaparashar1025@gmail.com";

const firebaseConfig = {
  apiKey: "AIzaSyAcIQ-_S2M7rmfAzI5i-hFrF1Bb3DuJCwo",
  authDomain: "website-blog-66d4e.firebaseapp.com",
  databaseURL: "https://website-blog-66d4e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "website-blog-66d4e",
  storageBucket: "website-blog-66d4e.firebasestorage.app",
  messagingSenderId: "363518565774",
  appId: "1:363518565774:web:66ee31857772ce129d18df",
  measurementId: "G-6TZ33VW8PZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

const authPanel = document.getElementById("auth-panel");
const authState = document.getElementById("auth-state");
const loginButton = document.getElementById("login-button");
const dashboard = document.getElementById("dashboard");
const logoutButton = document.getElementById("logout-button");
const adminEmail = document.getElementById("admin-email");
const pendingCount = document.getElementById("pending-count");
const selectedCount = document.getElementById("selected-count");
const approveSelectedButton = document.getElementById("approve-selected");
const rejectSelectedButton = document.getElementById("reject-selected");
const adminStatus = document.getElementById("admin-status");
const pendingList = document.getElementById("pending-list");

let unsubscribePending = null;
let pendingItems = [];
let selectedKeys = new Set();

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value) {
  if (!value) return "Date not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getCommentText(comment) {
  return comment.message || comment.body || comment.text || "";
}

function itemKey(item) {
  return `${item.postId}::${item.commentId}`;
}

function setStatus(message, tone = "") {
  adminStatus.textContent = message || "";
  adminStatus.className = `admin-comments-status ${tone}`.trim();
}

function updateSelectionUi() {
  selectedCount.textContent = selectedKeys.size;
  approveSelectedButton.disabled = selectedKeys.size === 0;
  rejectSelectedButton.disabled = selectedKeys.size === 0;
}

function flattenPending(snapshotValue) {
  const rows = [];
  Object.entries(snapshotValue || {}).forEach(([postId, comments]) => {
    Object.entries(comments || {}).forEach(([commentId, comment]) => {
      rows.push({
        ...(comment || {}),
        postId,
        commentId,
        createdAt: comment?.createdAt || 0,
        updatedAt: comment?.updatedAt || 0
      });
    });
  });

  return rows.sort((a, b) => (b.createdAt || b.updatedAt || 0) - (a.createdAt || a.updatedAt || 0));
}

function renderPending() {
  pendingCount.textContent = pendingItems.length;
  selectedKeys = new Set([...selectedKeys].filter(key => pendingItems.some(item => itemKey(item) === key)));
  updateSelectionUi();

  if (!pendingItems.length) {
    pendingList.innerHTML = '<div class="admin-comments-empty">No pending comments.</div>';
    return;
  }

  pendingList.innerHTML = pendingItems.map(item => {
    const key = itemKey(item);
    const isReply = Boolean(item.parentId);
    return `
      <article class="admin-comment-card" data-post-id="${escapeHtml(item.postId)}" data-comment-id="${escapeHtml(item.commentId)}">
        <label class="admin-comment-check">
          <input type="checkbox" data-select-comment="${escapeHtml(key)}" ${selectedKeys.has(key) ? "checked" : ""}>
          <span>Select</span>
        </label>
        <div class="admin-comment-content">
          <div class="admin-comment-heading">
            <h2>${escapeHtml(item.name || item.authorName || "Anonymous")}</h2>
            <time>${escapeHtml(formatDate(item.createdAt || item.updatedAt))}</time>
          </div>
          <p class="admin-comment-message">${escapeHtml(getCommentText(item))}</p>
          <dl class="admin-comment-meta">
            <div><dt>postId</dt><dd>${escapeHtml(item.postId)}</dd></div>
            <div><dt>commentId</dt><dd>${escapeHtml(item.commentId)}</dd></div>
            ${isReply ? `<div><dt>reply to</dt><dd>${escapeHtml(item.parentId)}</dd></div>` : ""}
          </dl>
        </div>
        <div class="admin-comment-buttons">
          <button class="admin-comments-approve" type="button" data-approve="${escapeHtml(key)}">Approve</button>
          <button class="admin-comments-reject" type="button" data-reject="${escapeHtml(key)}">Reject</button>
        </div>
      </article>
    `;
  }).join("");
}

function findItemByKey(key) {
  return pendingItems.find(item => itemKey(item) === key);
}

function approvedRefFor(comment) {
  if (comment.parentId) {
    return ref(db, `comments/${comment.postId}/${comment.parentId}/replies/${comment.commentId}`);
  }

  return ref(db, `comments/${comment.postId}/${comment.commentId}`);
}

async function approveComment(item) {
  const pendingRef = ref(db, `pendingComments/${item.postId}/${item.commentId}`);
  const snapshot = await get(pendingRef);
  if (!snapshot.exists()) {
    throw new Error("Pending comment no longer exists.");
  }

  const now = Date.now();
  const pendingComment = snapshot.val() || {};
  const approvedComment = {
    ...pendingComment,
    id: item.commentId,
    postId: item.postId,
    status: "approved",
    approved: true,
    approvedAt: now,
    updatedAt: now
  };

  await set(approvedRefFor({ ...approvedComment, commentId: item.commentId }), approvedComment);
  await remove(pendingRef);
}

async function rejectComment(item) {
  await remove(ref(db, `pendingComments/${item.postId}/${item.commentId}`));
}

async function runBulk(items, action, label) {
  let success = 0;
  let failed = 0;

  for (const item of items) {
    try {
      await action(item);
      selectedKeys.delete(itemKey(item));
      success += 1;
    } catch (error) {
      failed += 1;
      console.error(`${label} failed:`, item.postId, item.commentId, error);
    }
  }

  setStatus(`${label}: ${success} succeeded, ${failed} failed.`, failed ? "error" : "success");
  updateSelectionUi();
}

function startPendingListener() {
  if (unsubscribePending) unsubscribePending();
  unsubscribePending = onValue(ref(db, "pendingComments"), snapshot => {
    pendingItems = flattenPending(snapshot.val() || {});
    renderPending();
  }, error => {
    console.error("Pending comments load failed:", error);
    setStatus("Could not load pending comments.", "error");
  });
}

function showLoggedOut() {
  if (unsubscribePending) unsubscribePending();
  unsubscribePending = null;
  pendingItems = [];
  selectedKeys.clear();
  dashboard.hidden = true;
  authPanel.hidden = false;
  authState.textContent = "Sign in with the admin Google account to moderate comments.";
  loginButton.hidden = false;
}

function showAccessDenied(user) {
  if (unsubscribePending) unsubscribePending();
  unsubscribePending = null;
  dashboard.hidden = true;
  authPanel.hidden = false;
  authState.textContent = `Access denied for ${user.email || "this account"}.`;
  loginButton.hidden = true;
}

function showDashboard(user) {
  authPanel.hidden = true;
  dashboard.hidden = false;
  adminEmail.textContent = user.email;
  setStatus("");
  startPendingListener();
}

loginButton.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Google login failed:", error);
    authState.textContent = "Login failed. Please try again.";
  }
});

logoutButton.addEventListener("click", () => signOut(auth));

pendingList.addEventListener("change", event => {
  const checkbox = event.target.closest("[data-select-comment]");
  if (!checkbox) return;

  if (checkbox.checked) {
    selectedKeys.add(checkbox.dataset.selectComment);
  } else {
    selectedKeys.delete(checkbox.dataset.selectComment);
  }
  updateSelectionUi();
});

pendingList.addEventListener("click", async event => {
  const approveButton = event.target.closest("[data-approve]");
  const rejectButton = event.target.closest("[data-reject]");

  if (approveButton) {
    const item = findItemByKey(approveButton.dataset.approve);
    if (!item) return;
    approveButton.disabled = true;
    await runBulk([item], approveComment, "Approve");
    return;
  }

  if (rejectButton) {
    const item = findItemByKey(rejectButton.dataset.reject);
    if (!item) return;
    rejectButton.disabled = true;
    await runBulk([item], rejectComment, "Reject");
  }
});

approveSelectedButton.addEventListener("click", async () => {
  const selected = [...selectedKeys].map(findItemByKey).filter(Boolean);
  await runBulk(selected, approveComment, "Approve selected");
});

rejectSelectedButton.addEventListener("click", async () => {
  const selected = [...selectedKeys].map(findItemByKey).filter(Boolean);
  if (!selected.length) return;
  if (!window.confirm(`Reject ${selected.length} selected comment(s)?`)) return;
  await runBulk(selected, rejectComment, "Reject selected");
});

onAuthStateChanged(auth, user => {
  if (!user) {
    showLoggedOut();
    return;
  }

  if ((user.email || "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    showAccessDenied(user);
    return;
  }

  showDashboard(user);
});
