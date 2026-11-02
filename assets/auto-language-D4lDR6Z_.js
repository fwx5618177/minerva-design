import{n as e}from"./rolldown-runtime-B0Z9INg1.js";function t(e){let t=e.querySelector(`#snippets`);return n.forEach((e,n)=>{let r=document.createElement(`minerva-code-block`);r.setAttribute(`language`,`auto`),r.setAttribute(`show-language`,``),r.setAttribute(`aria-label`,`Snippet ${n+1}`),r.code=e,t.append(r)}),()=>t.replaceChildren()}var n;function r(){return(r=e((()=>{n=[`{
  "title": "The Little Prince",
  "year": 1943
}`,`def word_count(path):
    with open(path) as f:
        return len(f.read().split())`,`SELECT title, COUNT(*) AS readers
FROM books
GROUP BY title
ORDER BY readers DESC;`,`server:
  port: 8080
  hosts:
    - reader.example.com`,`It was a dark and stormy night;
the rain fell in torrents.`]})))()}r();export{t as setup};