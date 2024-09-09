const t=document.body.querySelector(".entry-field"),e=document.body.querySelector(".library__items"),r=document.body.querySelector(".button--delete"),n=document.body.querySelector(".error-message");let o=[];function i(t,e,r,n){this.id=t,this.name=e,this.author=r,this.status=n,this.toggleStatus=function(){this.status="read"===this.status?"unread":"read"}}function a(t){let{id:r,name:n,author:o,status:i}=t;e.insertAdjacentHTML("beforeend",`
      <tr class="library__item" data-id=${r}>
        <td>${n}</td>
        <td>${o}</td>
        <td><button class="button button--status">${i}</button></td>
        <td><button class="button button--remove">delete</button></td>
      </tr>
    `)}function l(){localStorage.myLibrary=JSON.stringify(o)}t.addEventListener("submit",t=>{t.preventDefault(),function(t){let e=Object.fromEntries(new FormData(t.target));e.id=o.length+1;let{id:r,name:d,author:s,status:u}=e;if(console.log(d,s),""===d||""===s){n.textContent="Error: fill in all fields of the form";return}n.textContent="";let c=new i(r,d,s,u);o.push(c),t.target.reset(),a(c),function(t){let e=document.querySelector(`[data-id='${t}'] .button--remove`);e.addEventListener("click",()=>{e.closest(".library__item").remove(),o=o.filter(e=>e.id!==t),l()})}(r),function(t){let e=document.querySelector(`[data-id='${t}'] .button--status`);e.addEventListener("click",()=>{e.textContent="read"===e.textContent?"unread":"read",o=o.map(e=>(e.id===t&&e.toggleStatus(),e)),l()})}(r),l()}(t)}),r.addEventListener("click",()=>{t.reset(),o=[],e.innerHTML="",localStorage.myLibrary=JSON.stringify([])}),function(){let t=localStorage.myLibrary;if(t)for(let t of o=JSON.parse(localStorage.myLibrary))a(t);t||(localStorage.myLibrary=JSON.stringify([]))}();
//# sourceMappingURL=index.405f06d5.js.map
