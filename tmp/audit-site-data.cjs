const fs = require('fs');
const vm = require('vm');

const context = { console };
context.window = context;
vm.createContext(context);
vm.runInContext(fs.readFileSync('data/site-data.js', 'utf8'), context);

const items = context.SiteData.getItems();
const counts = items.reduce((result, item) => {
  result[item.cat] = (result[item.cat] || 0) + 1;
  return result;
}, {});
const academicCounts = context.SiteData.countAcademicPosts();
console.log(JSON.stringify({
  total: items.length,
  counts,
  academicCounts,
  travelPlaces: context.SiteData.travelMapData.length,
  publicationTypes: context.SiteData.stats.publicationTypes,
}, null, 2));
