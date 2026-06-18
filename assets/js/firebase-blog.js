import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  runTransaction,
  push,
  get,
  set,
  remove,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

/*
  Firebase global blog system for GitHub Pages/static HTML.

  Works for:
  - Post-wise views
  - Post-wise likes
  - Post-wise comments
  - Post-wise photo taken date

  Required IDs in a blog detail page:
  - global-views
  - global-likes
  - global-comments-count
  - like-btn
  - global-comments-list
  - global-comment-form

  Optional IDs:
  - global-photo-taken-on
*/

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
const db = getDatabase(app);

function slugify(value) {
  return String(value || "blog")
    .toLowerCase()
    .replace(/\.html?$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "blog";
}

function getCurrentPostId() {
  const script = document.querySelector('script[src$="assets/js/firebase-blog.js"], script[src$="firebase-blog.js"]');
  const explicitId =
    document.body?.dataset.blogPostId ||
    document.querySelector('meta[name="blog-post-id"]')?.content ||
    script?.dataset.blogPostId;

  if (explicitId) {
    return slugify(explicitId);
  }

  const pageName = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
  return slugify(pageName);
}

function initialPageDate() {
  const explicitDate =
    document.body?.dataset.blogDate ||
    document.querySelector('meta[name="blog-date"]')?.content ||
    document.getElementById("global-photo-taken-on")?.textContent?.trim();

  if (explicitDate) {
    return explicitDate;
  }

  const lastModified = new Date(document.lastModified);
  if (!Number.isNaN(lastModified.getTime())) {
    return lastModified.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  return "Date";
}

function addFirebaseBlogStyles() {
  if (document.getElementById("firebase-blog-style")) return;

  const style = document.createElement("style");
  style.id = "firebase-blog-style";
  style.textContent = `
    .firebase-blog-widget { background: #f5f6ff; padding: 0 0 42px; }
    .firebase-blog-panel { background: #fff; border-radius: 12px; padding: 28px; box-shadow: 0 3px 18px rgba(15,52,96,.07); }
    .firebase-blog-stats { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-bottom: 22px; color: #444; font-size: .86rem; }
    .firebase-blog-stats span { display: inline-flex; align-items: center; gap: 6px; }
    .firebase-blog-stats i { color: #7eb8e0; }
    .firebase-blog-stats button { border: 1px solid #7eb8e0; background: #fff; color: #0f3460; border-radius: 20px; padding: 5px 14px; font-weight: 700; cursor: pointer; }
    .firebase-blog-stats button:hover, .firebase-blog-stats button.liked, .firebase-blog-stats button.copied { background: #7eb8e0; color: #fff; }
    .blog_meta .blog-share-btn { border: 0; background: transparent; color: #777; padding: 0; cursor: pointer; font: inherit; }
    .blog_meta .blog-share-btn:hover, .blog_meta .blog-share-btn.copied { color: #0f3460; }
    .firebase-blog-panel .comments-area { background: #fff; padding: 0; margin: 0 0 24px; box-shadow: none; }
    .firebase-blog-panel .comments-area h4, .firebase-blog-panel .comment-form h4 { color: #0f3460 !important; font-weight: 800 !important; margin-bottom: 18px; }
    .firebase-blog-panel .comment-form { background: #fff; padding: 0; box-shadow: none; }
    .firebase-blog-panel .form-control { border: 1px solid #d0d8ff; border-radius: 8px; width: 100%; padding: 10px 12px; }
    .firebase-blog-panel .primary_btn { border: 0; background: linear-gradient(135deg,#0f3460,#7eb8e0); color: #fff !important; font-size: .82rem; padding: 10px 28px; border-radius: 24px; display: inline-block; font-weight: 700; cursor: pointer; }
    .comment-avatar { width: 52px; height: 52px; border-radius: 50%; border: 2px solid #7eb8e0; background: #eef6ff; color: #0f3460; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; }
    .no-comments { color: #777; margin: 0 0 12px; }
    .comment-item { border-bottom: 1px solid #eef0ff; padding: 0 0 14px; margin-bottom: 14px; }
    .comment-item h5 { color: #0f3460 !important; font-weight: 700; margin-bottom: 4px; }
    .comment-item small { display: block; color: #999; font-size: .75rem; margin-bottom: 8px; }
    .comment-item p { color: #555; font-size: .88rem; margin: 0; }
    .firebase-comment-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .firebase-comment-action { border: 1px solid #d7e0f4; background: #fff; color: #0f3460; border-radius: 18px; padding: 4px 10px; font-size: .72rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all .2s; }
    .firebase-comment-action:hover, .firebase-comment-action.liked { background: #0f3460; border-color: #0f3460; color: #fff; }
    .firebase-comment-replies { margin: 10px 0 0 18px; padding-left: 14px; border-left: 2px solid #e3eafa; display: flex; flex-direction: column; gap: 8px; }
    .firebase-comment-reply { background: #fff; border: 1px solid #edf1fb; border-radius: 10px; padding: 8px 10px; }
    .firebase-comment-reply strong { color: #0f3460; }
    .firebase-comment-reply p { margin: 3px 0 0; color: #555; font-size: .84rem; }
    .firebase-comment-reply small { display: block; margin-top: 3px; color: #8a96aa; font-size: .68rem; }
    .firebase-comment-reply-form { display: none; grid-template-columns: minmax(110px, 150px) 1fr auto; gap: 8px; margin-top: 10px; }
    .firebase-comment-reply-form.open { display: grid; }
    .firebase-comment-reply-form input, .firebase-comment-reply-form textarea { border: 1px solid #d7e0f4; border-radius: 8px; padding: 8px 10px; min-width: 0; }
    .firebase-comment-reply-form textarea { min-height: 38px; resize: vertical; }
    .firebase-comment-reply-form button[type="submit"] { border: 0; border-radius: 8px; background: #0f3460; color: #fff; font-weight: 800; padding: 8px 12px; cursor: pointer; }
    .firebase-emoji-row { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin: 8px 0 10px; }
    .firebase-emoji-btn { border: 1px solid #d7e0f4; background: #f7f9ff; border-radius: 18px; min-width: 31px; height: 31px; cursor: pointer; font-size: 1rem; line-height: 1; }
    .firebase-emoji-btn:hover { background: #eef6ff; border-color: #7eb8e0; }
    .post-card .card-meta span { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
    .post-card .card-meta button { border: 0; background: transparent; color: #40506a; display: inline-flex; align-items: center; gap: 4px; padding: 0; cursor: pointer; font: inherit; white-space: nowrap; }
    .post-card .card-meta button:hover, .post-card .card-meta button.copied { color: #0f3460; }
    .firebase-post-stats { margin: 18px 0 0; padding: 14px; border: 1px solid #dde6f7; border-radius: 12px; background: #fff; box-shadow: 0 3px 16px rgba(15,52,96,.07); font-size: .82rem; color: #40506a; }
    .firebase-post-stats-bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .firebase-post-stats-bar span { display: inline-flex; align-items: center; gap: 5px; }
    .firebase-post-stats i { color: #7eb8e0; }
    .firebase-post-like, .firebase-post-comments-toggle, .firebase-post-share { border: 1px solid #cfdaf2; background: #f7f9ff; color: #0f3460; border-radius: 20px; padding: 6px 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all .2s; }
    .firebase-post-like:hover, .firebase-post-like.liked, .firebase-post-comments-toggle:hover, .firebase-post-share:hover, .firebase-post-share.copied { background: #0f3460; color: #fff; border-color: #0f3460; }
    .firebase-post-comments { display: none; margin-top: 12px; border-top: 1px solid #edf1fb; padding-top: 12px; }
    .firebase-post-comments.open { display: block; }
    .firebase-post-comment-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px; }
    .firebase-post-comment-item { background: #f7f9ff; border: 1px solid #e3eafa; border-radius: 10px; padding: 8px 10px; color: #445; }
    .firebase-post-comment-item small { display: block; color: #7d8aa3; margin-top: 3px; font-size: .7rem; }
    .firebase-post-comment-empty { color: #8a96aa; font-style: italic; margin-bottom: 8px; }
    .firebase-post-comment-form { display: grid; grid-template-columns: minmax(110px, 160px) 1fr auto; gap: 8px; }
    .firebase-post-comment-form input,
    .firebase-post-comment-form textarea { border: 1px solid #d7e0f4; border-radius: 8px; padding: 8px 10px; min-width: 0; }
    .firebase-post-comment-form textarea { min-height: 40px; resize: vertical; }
    .firebase-post-comment-form button { border: 0; border-radius: 8px; background: #0f3460; color: #fff; font-weight: 800; padding: 8px 12px; cursor: pointer; }
    @media(max-width:640px){.firebase-post-comment-form,.firebase-comment-reply-form{grid-template-columns:1fr}.firebase-post-stats-bar > span,.firebase-post-like,.firebase-post-comments-toggle,.firebase-post-share{width:100%;justify-content:center;}}
  `;
  document.head.appendChild(style);
}

function isBlogIndexPage() {
  return Boolean(document.getElementById("posts-grid"));
}

function getPostTitle(el) {
  const titleEl = el.querySelector(".conf-card-header h3, .hobby-card h3, .blog-gallery-label, .blog_details h2, h2, h3");
  return titleEl ? titleEl.textContent.replace(/\s+/g, " ").trim() : document.title;
}

function getElementPostId(el, index) {
  const explicitId = el.dataset.blogPostId || el.id;
  if (explicitId) {
    return slugify(explicitId);
  }

  const nestedId = el.querySelector("[id]")?.id;
  if (nestedId) {
    return slugify(nestedId);
  }

  const pageId = getCurrentPostId();
  return slugify(`${pageId}-${getPostTitle(el) || "post"}-${index + 1}`);
}

function fallbackPhotoTakenOn(el) {
  const explicitDate =
    el.dataset.photoTakenOn ||
    el.querySelector("[data-photo-taken-on]")?.textContent?.trim() ||
    el.querySelector(".conf-meta .fa-calendar")?.parentElement?.textContent?.replace(/\s+/g, " ").trim();

  return explicitDate || initialPageDate();
}

function formatCommentCount(count) {
  return String(Number(count || 0));
}

const COMMENT_EMOJIS = ["❤️", "😊", "👏", "🎉", "🙏", "✨", "😍", "💐"];

function normalizeReplies(replies) {
  return Object.entries(replies || {})
    .filter(([, reply]) => reply && typeof reply === "object")
    .map(([id, reply]) => ({ id, ...reply }))
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
}

function normalizeComments(data) {
  return Object.entries(data || {})
    .filter(([, comment]) => comment !== null && comment !== undefined)
    .map(([id, comment]) => {
      if (typeof comment === "object") {
        return { id, ...comment };
      }

      return {
        id,
        name: "Visitor",
        message: String(comment),
        createdAt: 0
      };
    })
    .filter(comment => String(comment.message || "").trim() || String(comment.name || "").trim())
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
}

function countCommentsWithReplies(comments) {
  return comments.reduce((total, comment) => total + 1 + normalizeReplies(comment.replies).length, 0);
}

function renderEmojiRow(targetName) {
  return `
    <div class="firebase-emoji-row" data-emoji-target="${escapeHtml(targetName)}" aria-label="Emoji options">
      ${COMMENT_EMOJIS.map(emoji => `<button type="button" class="firebase-emoji-btn" data-emoji="${escapeHtml(emoji)}">${escapeHtml(emoji)}</button>`).join("")}
    </div>
  `;
}

function insertTextAtCursor(field, text) {
  if (!field) return;

  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? field.value.length;
  const before = field.value.slice(0, start);
  const after = field.value.slice(end);
  const prefix = before && !before.endsWith(" ") ? " " : "";
  field.value = before + prefix + text + after;
  const cursor = start + prefix.length + text.length;
  field.focus();
  field.setSelectionRange(cursor, cursor);
}

function renderCommentActions(postId, comment) {
  return `
    <div class="firebase-comment-actions">
      <button type="button" class="firebase-comment-action firebase-comment-like" data-comment-id="${escapeHtml(comment.id)}" aria-pressed="false">
        <i class="fa fa-heart"></i> Like <strong data-comment-like-count>${formatNumber(comment.likes || 0)}</strong>
      </button>
      <button type="button" class="firebase-comment-action firebase-comment-reply-toggle" data-comment-id="${escapeHtml(comment.id)}">
        <i class="fa fa-reply"></i> Reply
      </button>
    </div>
    <form class="firebase-comment-reply-form" data-comment-id="${escapeHtml(comment.id)}">
      <input type="text" name="name" placeholder="Your name" required>
      <textarea name="message" placeholder="Write a reply" required></textarea>
      <button type="submit">Reply</button>
      <div style="grid-column:1 / -1;">${renderEmojiRow("message")}</div>
    </form>
  `;
}

function renderReplies(comment) {
  const replies = normalizeReplies(comment.replies);
  if (!replies.length) return "";

  return `
    <div class="firebase-comment-replies">
      ${replies.map(reply => {
        const replyDate = formatDateTime(reply.createdAt);
        return `
          <div class="firebase-comment-reply" data-reply-id="${escapeHtml(reply.id)}">
            <strong>${escapeHtml(reply.name)}</strong>
            <p>${escapeHtml(reply.message)}</p>
            ${replyDate ? `<small>${escapeHtml(replyDate)}</small>` : ""}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function hydrateCommentLikeButtons(container, postId) {
  if (!container || !visitorId) return;

  container.querySelectorAll(".firebase-comment-like").forEach(button => {
    const commentId = button.dataset.commentId;
    if (!commentId) return;

    get(ref(db, `commentLikes/${postId}/${commentId}/${visitorId}`))
      .then(snapshot => {
        button.classList.toggle("liked", snapshot.exists());
        button.setAttribute("aria-pressed", snapshot.exists() ? "true" : "false");
      })
      .catch(error => console.error("Comment like status load failed:", error));
  });
}

async function toggleCommentLike(button, postId) {
  const commentId = button?.dataset.commentId;
  if (!commentId || !visitorId) return;

  const userLikeRef = ref(db, `commentLikes/${postId}/${commentId}/${visitorId}`);
  const totalLikesRef = ref(db, `comments/${postId}/${commentId}/likes`);

  button.disabled = true;

  try {
    const snapshot = await get(userLikeRef);

    if (snapshot.exists()) {
      await remove(userLikeRef);
      await runTransaction(totalLikesRef, current => Math.max((current || 1) - 1, 0));
      button.classList.remove("liked");
      button.setAttribute("aria-pressed", "false");
    } else {
      await set(userLikeRef, true);
      await runTransaction(totalLikesRef, current => (current || 0) + 1);
      button.classList.add("liked");
      button.setAttribute("aria-pressed", "true");
    }
  } catch (error) {
    console.error("Comment like update failed:", error);
    alert("Could not update comment like. Please try again.");
  } finally {
    button.disabled = false;
  }
}

function setupCommentInteractions(container, postId) {
  if (!container || container.dataset.commentActionsReady === "true") return;

  container.dataset.commentActionsReady = "true";

  container.addEventListener("click", async event => {
    const emojiBtn = event.target.closest(".firebase-emoji-btn");
    if (emojiBtn) {
      const form = emojiBtn.closest("form");
      const targetName = emojiBtn.closest("[data-emoji-target]")?.dataset.emojiTarget || "message";
      insertTextAtCursor(form?.elements?.[targetName], emojiBtn.dataset.emoji || emojiBtn.textContent);
      return;
    }

    const likeBtn = event.target.closest(".firebase-comment-like");
    if (likeBtn) {
      await toggleCommentLike(likeBtn, postId);
      return;
    }

    const replyBtn = event.target.closest(".firebase-comment-reply-toggle");
    if (replyBtn) {
      const commentId = replyBtn.dataset.commentId || "";
      const escapedId = window.CSS?.escape ? CSS.escape(commentId) : commentId.replace(/"/g, '\\"');
      const form = container.querySelector(`.firebase-comment-reply-form[data-comment-id="${escapedId}"]`);
      form?.classList.toggle("open");
      form?.querySelector("textarea")?.focus();
    }
  });

  container.addEventListener("submit", async event => {
    const form = event.target.closest(".firebase-comment-reply-form");
    if (!form) return;

    event.preventDefault();

    const commentId = form.dataset.commentId;
    const formData = new FormData(form);
    const name = formData.get("name")?.trim();
    const message = formData.get("message")?.trim();

    if (!commentId || !name || !message) {
      alert("Please enter your name and reply.");
      return;
    }

    if (name.length > 60) {
      alert("Name should be less than 60 characters.");
      return;
    }

    if (message.length > 1000) {
      alert("Reply should be less than 1000 characters.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.disabled = true;

    try {
      await push(ref(db, `comments/${postId}/${commentId}/replies`), {
        name,
        message,
        createdAt: serverTimestamp()
      });

      form.reset();
      form.classList.remove("open");
    } catch (error) {
      console.error("Reply submit failed:", error);
      alert("Could not post reply. Please try again.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

function setupMainCommentForm(form) {
  if (!form || form.dataset.emojiReady === "true") return;

  form.dataset.emojiReady = "true";
  const textarea = form.querySelector('textarea[name="message"]');
  if (!textarea) return;

  textarea.insertAdjacentHTML("afterend", renderEmojiRow("message"));
}

function getAbsoluteUrl(value) {
  return new URL(value || window.location.href, window.location.href).href;
}

function getPageShareUrl() {
  const url = new URL(window.location.href);
  url.hash = "";
  return url.href;
}

function getElementShareUrl(el) {
  const targetId = el.id || el.querySelector("[id]")?.id;
  const url = new URL(window.location.href);
  url.hash = targetId || "";
  return url.href;
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function flashShareCopied(button) {
  if (!button) return;

  const originalHtml = button.dataset.originalHtml || button.innerHTML;
  button.dataset.originalHtml = originalHtml;
  button.classList.add("copied");
  button.innerHTML = `<i class="fa fa-check"></i> Copied`;

  window.clearTimeout(button._shareResetTimer);
  button._shareResetTimer = window.setTimeout(() => {
    button.classList.remove("copied");
    button.innerHTML = button.dataset.originalHtml;
  }, 1800);
}

function attachShareButton(button, options) {
  if (!button || button.dataset.shareReady === "true") return;

  button.dataset.shareReady = "true";
  button.addEventListener("click", async () => {
    const url = options.url;
    const title = options.title || document.title;

    button.disabled = true;

    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
      } else {
        await copyToClipboard(url);
        flashShareCopied(button);
      }
    } catch (error) {
      if (error?.name === "AbortError") return;

      try {
        await copyToClipboard(url);
        flashShareCopied(button);
      } catch (copyError) {
        console.error("Share failed:", copyError);
        alert("Could not copy the link. Please try again.");
      }
    } finally {
      button.disabled = false;
    }
  });
}

function ensureGlobalShareButton() {
  const existingButton = document.getElementById("share-btn");
  if (existingButton) return existingButton;

  const metaList = document.querySelector(".blog_meta.list");
  if (metaList) {
    const item = document.createElement("li");
    item.innerHTML = `<button id="share-btn" class="blog-share-btn" type="button">Share</button><i class="fa fa-share-alt"></i>`;
    metaList.appendChild(item);
    return item.querySelector("#share-btn");
  }

  const stats = document.querySelector(".firebase-blog-stats");
  if (stats) {
    const item = document.createElement("span");
    item.innerHTML = `<button id="share-btn" type="button"><i class="fa fa-share-alt"></i> Share</button>`;
    stats.appendChild(item);
    return item.querySelector("#share-btn");
  }

  return null;
}

const viewedPostIds = new Set();

function incrementPostView(postId) {
  if (!postId || viewedPostIds.has(postId)) return;

  viewedPostIds.add(postId);
  runTransaction(ref(db, `posts/${postId}/views`), current => {
    return (current || 0) + 1;
  }).catch(error => {
    console.error("Post view update failed:", error);
  });
}

function observePostView(el, postId) {
  if (!("IntersectionObserver" in window)) {
    incrementPostView(postId);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        incrementPostView(postId);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -10% 0px" });

  observer.observe(el);
}

function hydrateBlogIndex() {
  addFirebaseBlogStyles();

  document.querySelectorAll("[data-blog-post-id]").forEach(card => {
    if (card.dataset.firebaseBlogHydrated === "true") return;
    card.dataset.firebaseBlogHydrated = "true";

    const postId = slugify(card.dataset.blogPostId || card.id);
    const dateEl = card.querySelector("[data-firebase-date]");
    const viewsEl = card.querySelector("[data-firebase-views]");
    const likesEl = card.querySelector("[data-firebase-likes]");
    const commentsEl = card.querySelector("[data-firebase-comments]");
    const shareBtn = card.querySelector("[data-firebase-share]");

    attachShareButton(shareBtn, {
      url: getAbsoluteUrl(card.dataset.blogPostUrl || card.querySelector(".read-btn")?.getAttribute("href")),
      title: card.querySelector("h3")?.textContent?.trim() || document.title
    });

    onValue(ref(db, `posts/${postId}/photoTakenOn`), snapshot => {
      if (dateEl && snapshot.exists()) {
        dateEl.textContent = snapshot.val();
      }
    });

    onValue(ref(db, `posts/${postId}/views`), snapshot => {
      if (viewsEl) {
        viewsEl.textContent = formatNumber(snapshot.val() || 0);
      }
    });

    onValue(ref(db, `posts/${postId}/likes`), snapshot => {
      if (likesEl) {
        likesEl.textContent = formatNumber(snapshot.val() || 0);
      }
    });

    onValue(ref(db, `comments/${postId}`), snapshot => {
      if (!commentsEl) return;

      const comments = snapshot.val() || {};
      commentsEl.textContent = formatCommentCount(Object.keys(comments).length);
    });

  });
}

window.FirebaseBlog = {
  refresh: hydrateBlogIndex
};

function renderPostComments(listEl, postId, comments) {
  if (!listEl) return;

  if (!comments.length) {
    listEl.innerHTML = `<div class="firebase-post-comment-empty">No comments yet.</div>`;
    return;
  }

  listEl.innerHTML = comments.map(comment => {
    const commentDate = formatDateTime(comment.createdAt);

    return `
      <div class="firebase-post-comment-item" data-comment-id="${escapeHtml(comment.id)}">
        <strong>${escapeHtml(comment.name)}</strong>: ${escapeHtml(comment.message)}
        ${commentDate ? `<small>${escapeHtml(commentDate)}</small>` : ""}
        ${renderCommentActions(postId, comment)}
        ${renderReplies(comment)}
      </div>
    `;
  }).join("");

  hydrateCommentLikeButtons(listEl, postId);
}

function renderPlainComments(listEl, comments) {
  if (!listEl) return;

  if (!comments.length) {
    listEl.innerHTML = `<div class="firebase-post-comment-empty">No comments yet.</div>`;
    return;
  }

  listEl.innerHTML = comments.map(comment => {
    const commentDate = formatDateTime(comment.createdAt);

    return `
      <div class="firebase-post-comment-item" data-comment-id="${escapeHtml(comment.id)}">
        <strong>${escapeHtml(comment.name || "Visitor")}</strong>: ${escapeHtml(comment.message || "")}
        ${commentDate ? `<small>${escapeHtml(commentDate)}</small>` : ""}
      </div>
    `;
  }).join("");
}

function createPostStatsWidget(el, postId, fallbackDate) {
  if (el.querySelector(":scope > .firebase-post-stats")) return;

  if (!el.id && !el.querySelector("[id]")) {
    el.id = postId;
  }

  const widget = document.createElement("div");
  widget.className = "firebase-post-stats";
  widget.innerHTML = `
    <div class="firebase-post-stats-bar">
      <span><i class="fa fa-calendar"></i> Date: <strong data-post-photo-taken-on>${escapeHtml(fallbackDate)}</strong></span>
      <span><i class="fa fa-eye"></i> <strong data-post-views>0</strong> Views</span>
      <button type="button" class="firebase-post-like"><i class="fa fa-heart"></i> Like <strong data-post-likes>0</strong></button>
      <button type="button" class="firebase-post-comments-toggle"><i class="fa fa-comment"></i> Comments <strong data-post-comments-count>0</strong></button>
      <button type="button" class="firebase-post-share"><i class="fa fa-share-alt"></i> Share</button>
    </div>
    <div class="firebase-post-comments">
      <div class="firebase-post-comment-list"></div>
      <form class="firebase-post-comment-form">
        <input type="text" name="name" placeholder="Your name" required>
        <textarea name="message" placeholder="Write your comment" required></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  `;

  el.appendChild(widget);

  const photoTakenOnEl = widget.querySelector("[data-post-photo-taken-on]");
  const viewsEl = widget.querySelector("[data-post-views]");
  const likesEl = widget.querySelector("[data-post-likes]");
  const commentsCountEl = widget.querySelector("[data-post-comments-count]");
  const likeBtn = widget.querySelector(".firebase-post-like");
  const commentsToggle = widget.querySelector(".firebase-post-comments-toggle");
  const shareBtn = widget.querySelector(".firebase-post-share");
  const commentsPanel = widget.querySelector(".firebase-post-comments");
  const commentsList = widget.querySelector(".firebase-post-comment-list");
  const commentForm = widget.querySelector(".firebase-post-comment-form");
  setupMainCommentForm(commentForm);
  setupCommentInteractions(commentsPanel, postId);

  attachShareButton(shareBtn, {
    url: getElementShareUrl(el),
    title: getPostTitle(el)
  });

  onValue(ref(db, `posts/${postId}/photoTakenOn`), snapshot => {
    if (snapshot.exists() && !el.dataset.photoTakenOn) {
      photoTakenOnEl.textContent = snapshot.val();
    }
  });

  onValue(ref(db, `posts/${postId}/views`), snapshot => {
    viewsEl.textContent = formatNumber(snapshot.val() || 0);
  });

  onValue(ref(db, `posts/${postId}/likes`), snapshot => {
    likesEl.textContent = formatNumber(snapshot.val() || 0);
  });

  get(ref(db, `likes/${postId}/${visitorId}`)).then(snapshot => {
    likeBtn.classList.toggle("liked", snapshot.exists());
    likeBtn.setAttribute("aria-pressed", snapshot.exists() ? "true" : "false");
  }).catch(error => {
    console.error("Like status load failed:", error);
  });

  likeBtn.addEventListener("click", async () => {
    const userLikeRef = ref(db, `likes/${postId}/${visitorId}`);
    const totalLikesRef = ref(db, `posts/${postId}/likes`);

    likeBtn.disabled = true;

    try {
      const snapshot = await get(userLikeRef);

      if (snapshot.exists()) {
        await remove(userLikeRef);
        await runTransaction(totalLikesRef, current => Math.max((current || 1) - 1, 0));
        likeBtn.classList.remove("liked");
        likeBtn.setAttribute("aria-pressed", "false");
      } else {
        await set(userLikeRef, true);
        await runTransaction(totalLikesRef, current => (current || 0) + 1);
        likeBtn.classList.add("liked");
        likeBtn.setAttribute("aria-pressed", "true");
      }
    } catch (error) {
      console.error("Like update failed:", error);
      alert("Could not update like. Please try again.");
    } finally {
      likeBtn.disabled = false;
    }
  });

  onValue(ref(db, `comments/${postId}`), snapshot => {
    const comments = normalizeComments(snapshot.val());

    commentsCountEl.textContent = formatCommentCount(countCommentsWithReplies(comments));
    try {
      renderPostComments(commentsList, postId, comments);
    } catch (error) {
      console.error("Rich comment render failed:", error);
      renderPlainComments(commentsList, comments);
    }
  });

  commentsToggle.addEventListener("click", () => {
    commentsPanel.classList.toggle("open");
  });

  commentForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(commentForm);
    const name = formData.get("name")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !message) {
      alert("Please enter your name and comment.");
      return;
    }

    const submitBtn = commentForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;

    try {
      await push(ref(db, `comments/${postId}`), {
        name,
        message,
        createdAt: serverTimestamp()
      });

      commentForm.reset();
    } catch (error) {
      console.error("Comment submit failed:", error);
      alert("Could not post comment. Please try again.");
    } finally {
      submitBtn.disabled = false;
    }
  });

  observePostView(el, postId);
}

function findPostStatElements() {
  const selectors = [
    ".conf-card",
    ".hobby-card",
    ".blog-gallery-section"
  ];

  const elements = [];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!elements.includes(el)) {
        elements.push(el);
      }
    });
  });

  return elements.filter(el => !el.closest(".firebase-blog-widget"));
}

function hydratePostStats() {
  addFirebaseBlogStyles();

  findPostStatElements().forEach((el, index) => {
    if (el.classList.contains("single-post") && document.getElementById("global-comment-form")) {
      return;
    }

    const postId = getElementPostId(el, index);
    createPostStatsWidget(el, postId, fallbackPhotoTakenOn(el));
  });
}

function ensureFirebaseBlogElements() {
  addFirebaseBlogStyles();

  const requiredIds = [
    "global-views",
    "global-likes",
    "global-comments-count",
    "like-btn",
    "global-comments-list",
    "global-comment-form"
  ];

  if (requiredIds.every(id => document.getElementById(id))) {
    return;
  }

  const section = document.createElement("section");
  section.className = "firebase-blog-widget";
  section.innerHTML = `
    <div class="container">
      <div class="firebase-blog-panel">
        <div class="firebase-blog-stats">
          <span><i class="fa fa-calendar"></i>Date: <span id="global-photo-taken-on"></span></span>
          <span><i class="lnr lnr-eye"></i><span id="global-views">0</span> Views</span>
          <span><button id="like-btn" type="button">Like</button> <span id="global-likes">0</span> Likes</span>
          <span><i class="lnr lnr-bubble"></i><span data-global-comments-count>0</span> Comments</span>
          <span><button id="share-btn" type="button"><i class="fa fa-share-alt"></i> Share</button></span>
        </div>
        <div class="comments-area">
          <h4><span id="global-comments-count">0</span> Comments</h4>
          <div id="global-comments-list"></div>
        </div>
        <div class="comment-form">
          <h4>Leave a Reply</h4>
          <form id="global-comment-form">
            <div class="form-group">
              <input type="text" name="name" class="form-control" placeholder="Your name" required>
            </div>
            <div class="form-group">
              <textarea name="message" class="form-control mb-10" rows="5" placeholder="Write your comment" required></textarea>
            </div>
            <button type="submit" class="primary_btn"><span>Post Comment</span></button>
          </form>
        </div>
      </div>
    </div>
  `;

  section.querySelector("#global-photo-taken-on").textContent = initialPageDate();

  const footer = document.getElementById("site-footer");
  if (footer?.parentNode) {
    footer.parentNode.insertBefore(section, footer);
  } else {
    document.body.appendChild(section);
  }
}

const IS_BLOG_INDEX = isBlogIndexPage();
const POST_ID = IS_BLOG_INDEX ? "" : getCurrentPostId();
const visitorId = IS_BLOG_INDEX ? "" : getVisitorId();
const HAS_POST_STAT_ELEMENTS = !IS_BLOG_INDEX && findPostStatElements().length > 0;

if (IS_BLOG_INDEX) {
  hydrateBlogIndex();
} else if (HAS_POST_STAT_ELEMENTS) {
  hydratePostStats();
} else {
  ensureFirebaseBlogElements();
}

if (!IS_BLOG_INDEX) {
  window.addEventListener("autoFolderGalleriesUpdated", () => {
    hydratePostStats();
  });
}

const HAS_GLOBAL_DETAIL_WIDGET = !IS_BLOG_INDEX && Boolean(
  document.getElementById("global-views") &&
  document.getElementById("global-likes") &&
  document.getElementById("global-comments-count") &&
  document.getElementById("like-btn") &&
  document.getElementById("global-comments-list") &&
  document.getElementById("global-comment-form")
);

const viewsEl = HAS_GLOBAL_DETAIL_WIDGET ? document.getElementById("global-views") : null;
const likesEl = HAS_GLOBAL_DETAIL_WIDGET ? document.getElementById("global-likes") : null;
const commentsCountEl = HAS_GLOBAL_DETAIL_WIDGET ? document.getElementById("global-comments-count") : null;
const commentsCountEls = [
  commentsCountEl,
  ...(HAS_GLOBAL_DETAIL_WIDGET ? document.querySelectorAll("[data-global-comments-count]") : [])
].filter(Boolean);
const likeBtn = HAS_GLOBAL_DETAIL_WIDGET ? document.getElementById("like-btn") : null;
const commentsList = HAS_GLOBAL_DETAIL_WIDGET ? document.getElementById("global-comments-list") : null;
const commentForm = HAS_GLOBAL_DETAIL_WIDGET ? document.getElementById("global-comment-form") : null;
const photoTakenOnEl = HAS_GLOBAL_DETAIL_WIDGET ? document.getElementById("global-photo-taken-on") : null;
const shareBtn = HAS_GLOBAL_DETAIL_WIDGET ? ensureGlobalShareButton() : null;

if (HAS_GLOBAL_DETAIL_WIDGET) {
  setupMainCommentForm(commentForm);
  setupCommentInteractions(commentForm?.closest(".firebase-blog-panel") || commentsList, POST_ID);
}

attachShareButton(shareBtn, {
  url: getPageShareUrl(),
  title: document.querySelector(".blog_details h2")?.textContent?.trim() || document.title
});

function getVisitorId() {
  let id = localStorage.getItem("visitor_id");

  if (!id) {
    if (window.crypto && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = "visitor_" + Date.now() + "_" + Math.random().toString(36).slice(2);
    }

    localStorage.setItem("visitor_id", id);
  }

  return id;
}

function formatNumber(num) {
  const value = Number(num || 0);

  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace(".0", "") + "M";
  }

  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(".0", "") + "K";
  }

  return String(value);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDateTime(timestamp) {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return String(timestamp);
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function getInitials(name) {
  return String(name || "Visitor")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join("") || "V";
}

/* -----------------------------
   Post view count
------------------------------ */

// One view per browser tab/session.
if (HAS_GLOBAL_DETAIL_WIDGET) {
  incrementPostView(POST_ID);
}

if (HAS_GLOBAL_DETAIL_WIDGET) {
  onValue(ref(db, `posts/${POST_ID}/views`), snapshot => {
    if (viewsEl) {
      viewsEl.textContent = formatNumber(snapshot.val() || 0);
    }
  });
}

/* -----------------------------
   Post likes
------------------------------ */

if (HAS_GLOBAL_DETAIL_WIDGET) {
  onValue(ref(db, `posts/${POST_ID}/likes`), snapshot => {
    if (likesEl) {
      likesEl.textContent = formatNumber(snapshot.val() || 0);
    }
  });
}

if (likeBtn) {
  get(ref(db, `likes/${POST_ID}/${visitorId}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        likeBtn.textContent = "Liked";
        likeBtn.classList.add("liked");
        likeBtn.setAttribute("aria-pressed", "true");
      } else {
        likeBtn.textContent = "Like";
        likeBtn.classList.remove("liked");
        likeBtn.setAttribute("aria-pressed", "false");
      }
    })
    .catch(error => {
      console.error("Like status load failed:", error);
    });

  likeBtn.addEventListener("click", async () => {
    const userLikeRef = ref(db, `likes/${POST_ID}/${visitorId}`);
    const totalLikesRef = ref(db, `posts/${POST_ID}/likes`);

    likeBtn.disabled = true;

    try {
      const snapshot = await get(userLikeRef);

      if (snapshot.exists()) {
        await remove(userLikeRef);
        await runTransaction(totalLikesRef, current => Math.max((current || 1) - 1, 0));

        likeBtn.textContent = "Like";
        likeBtn.classList.remove("liked");
        likeBtn.setAttribute("aria-pressed", "false");
      } else {
        await set(userLikeRef, true);
        await runTransaction(totalLikesRef, current => (current || 0) + 1);

        likeBtn.textContent = "Liked";
        likeBtn.classList.add("liked");
        likeBtn.setAttribute("aria-pressed", "true");
      }
    } catch (error) {
      console.error("Like update failed:", error);
      alert("Could not update like. Please try again.");
    } finally {
      likeBtn.disabled = false;
    }
  });
}

/* -----------------------------
   Post comments
------------------------------ */

if (HAS_GLOBAL_DETAIL_WIDGET) {
  onValue(ref(db, `comments/${POST_ID}`), snapshot => {
    const data = snapshot.val() || {};

    const comments = normalizeComments(data);

    const totalComments = countCommentsWithReplies(comments);
    commentsCountEls.forEach(el => {
      el.textContent = formatCommentCount(totalComments);
    });

    if (commentsList) {
      if (comments.length === 0) {
        commentsList.innerHTML = `<p class="no-comments">No comments yet. Be the first to comment.</p>`;
        return;
      }

      try {
        commentsList.innerHTML = comments.map(comment => {
          const commentDate = formatDateTime(comment.createdAt);

          return `
            <div class="comment-list" data-comment-id="${escapeHtml(comment.id)}">
              <div class="single-comment justify-content-between d-flex">
                <div class="user justify-content-between d-flex">
                  <div class="thumb"><span class="comment-avatar">${escapeHtml(getInitials(comment.name))}</span></div>
                  <div class="desc">
                    <h5>${escapeHtml(comment.name || "Visitor")}</h5>
                    ${commentDate ? `<p class="date">${escapeHtml(commentDate)}</p>` : ""}
                    <p class="comment">${escapeHtml(comment.message || "")}</p>
                    ${renderCommentActions(POST_ID, comment)}
                    ${renderReplies(comment)}
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join("");
        hydrateCommentLikeButtons(commentsList, POST_ID);
      } catch (error) {
        console.error("Rich comment render failed:", error);
        renderPlainComments(commentsList, comments);
      }
    }
  });
}

if (commentForm) {
  commentForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(commentForm);
    const name = formData.get("name")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !message) {
      alert("Please enter your name and comment.");
      return;
    }

    if (name.length > 60) {
      alert("Name should be less than 60 characters.");
      return;
    }

    if (message.length > 1000) {
      alert("Comment should be less than 1000 characters.");
      return;
    }

    const submitBtn = commentForm.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.disabled = true;

    try {
      await push(ref(db, `comments/${POST_ID}`), {
        name,
        message,
        createdAt: serverTimestamp()
      });

      commentForm.reset();
    } catch (error) {
      console.error("Comment submit failed:", error);
      alert("Could not post comment. Please try again.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

/* -----------------------------
   Optional global photo taken date
------------------------------ */

if (HAS_GLOBAL_DETAIL_WIDGET) {
  onValue(ref(db, `posts/${POST_ID}/photoTakenOn`), snapshot => {
    if (photoTakenOnEl && snapshot.exists()) {
      photoTakenOnEl.textContent = snapshot.val();
    }
  });
}
