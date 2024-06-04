const t=document.body.querySelector(".entry-field"),e=document.body.querySelector(".library__items"),n=document.body.querySelector(".button--delete");let o=[];function d(t,e,n,o){this.id=t,this.name=e,this.author=n,this.status=o,this.toggleStatus=function(){this.status="read"===this.status?"unread":"read"}}t.addEventListener("submit",r=>{r.preventDefault(),function(r){let s=Object.fromEntries(new FormData(r.target));s.id=o.length+1;let{id:u,name:i,author:a,status:l}=s,c=new d(u,i,a,l);o.push(c),r.target.reset(),function(t){let{id:n,name:o,author:d,status:r}=t;e.insertAdjacentHTML("beforeend",`
      <tr class="library__item" data-id=${n}>
        <td>${o}</td>
        <td>${d}</td>
        <td><button class="button button--status">${r}</button></td>
        <td><button class="button button--remove">delete</button></td>
      </tr>
    `)}(c),function(t){let e=document.querySelector(`[data-id='${t}'] .button--remove`);console.log(e),e.addEventListener("click",()=>{e.closest(".library__item").remove(),o=o.filter(e=>e.id!==t)})}(u),function(t){let e=document.querySelector(`[data-id='${t}'] .button--status`);e.addEventListener("click",()=>{e.textContent="read"===e.textContent?"unread":"read",o=o.map(e=>(e.id===t&&e.toggleStatus(),e))})}(u),n.addEventListener("click",()=>{t.reset(),o=[],e.innerHTML=""})}(r)});
//# sourceMappingURL=index.cb4d9af0.js.map
