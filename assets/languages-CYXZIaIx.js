import{n as e}from"./rolldown-runtime-B0Z9INg1.js";function t(e){let t=e.querySelector(`#samples`);for(let[e,r]of n){let n=document.createElement(`minerva-code-block`);n.setAttribute(`language`,e),n.setAttribute(`show-language`,``),n.setAttribute(`aria-label`,`${e} example`),n.code=r,t.append(n)}return()=>t.replaceChildren()}var n;function r(){return(r=e((()=>{n=[[`ts`,`export async function loadBook(id: number): Promise<Book> {
  const response = await fetch(\`/api/books/\${id}\`);
  return response.json(); // typed by the caller
}`],[`css`,`.card:hover {
  --card-shadow: 0 4px 12px rgb(0 0 0 / 0.12);
  color: #1f2937 !important;
}`],[`html`,`<!-- Sign-up form -->
<form action="/join" method="post">
  <input name="email" type="email" required>
</form>`],[`bash`,`# Install and build
export NODE_ENV=production
pnpm add minerva-design && pnpm build --filter "$APP"`],[`python`,`@dataclass
class Point:
    def norm(self) -> float:
        return abs(self.x)  # distance to 0`],[`diff`,`@@ -1,3 +1,3 @@
 {
-  "theme": "light"
+  "theme": "dark"
 }`]]})))()}r();export{t as setup};