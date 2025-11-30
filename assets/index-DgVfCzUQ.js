(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();class l{static setAPIUrl(e){this.apiUrl=e}static async findAll(){return(await fetch(this.apiUrl+"todos")).json()}static async addNewTodo(e){return(await fetch(this.apiUrl+"todos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:e,completed:!1})})).json()}static async deleteTodo(e){return await fetch(this.apiUrl+"todos/"+e,{method:"DELETE"})}static async updateOne(e){return await fetch(this.apiUrl+"todos/"+e.id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:e.content,completed:e.completed})})}}function r(s){return`<li data-id="${s.id}" class="${s.completed?"completed":""}">
            <div class="view">
              <input class="toggle" type="checkbox" ${s.completed?"checked":""} 
              onchange="window.todolist.toggleCompletedOneById(${s.id}, this.checked)"/>
              <label ondblclick="this.closest('li').classList.toggle('editing')">${s.content}</label>
              <button class="destroy" onclick="window.todolist.deleteTodo(${s.id})"></button>
            </div>
            <input onchange="window.todolist.updateOneById(${s.id}, this.value)" class="edit" value="${s.content}"/>
          </li>`}class a{constructor(e){this.id=e.id,this.content=e.content,this.completed=e.completed,this.createdAt=e.created_at}render(){return r(this)}}function c(s){return`<section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
          onchange="window.todolist.addTodo(this)"
        />
      </header>
      <main class="main">
        <div class="toggle-all-container">
          <input class="toggle-all" type="checkbox" />
          <label class="toggle-all-label" for="toggle-all"
            >Mark all as complete</label
          >
        </div>
        <ul role="todo-list" class="todo-list">
        ${s.todos.map(e=>e.render()).join(" ")}
        </ul>
      </main>
      <footer class="footer">
        <span class="todo-count" role="todo-count"><span>${s.displayItemLeftCount()}</span> item(s) left</span>
        <ul class="filters">
          <li><a href="#/" class="selected">All</a></li>
          <li><a href="#/active">Active</a></li>
          <li><a href="#/completed">Completed</a></li>
        </ul>
        <button class="clear-completed">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Created by the TodoMVC Team</p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
`}class p{constructor(e){this.domEl=document.querySelector(e.el),this.newTodo=null,l.setAPIUrl(e.apiUrl),this.todos=[],this.loadTodos()}async loadTodos(){const e=await l.findAll();this.todos=e.map(t=>new a(t)),this.render()}render(){this.domEl.innerHTML=c(this)}displayItemLeftCount(){return this.todos.filter(e=>!e.completed).length}renderItemLeftCount(){this.domEl.querySelector('[role="todo-count"] span').innerText=this.displayItemLeftCount()}addItemIntodos(e){this.newTodo=new a(e),this.todos.push(this.newTodo)}addItemInDom(){const e=this.domEl.querySelector('[role="todo-list"]'),t=document.createElement("div");e.append(t),t.outerHTML=this.newTodo.render()}async addTodo(e){const t=await l.addNewTodo(e.value);this.addItemIntodos(t),this.addItemInDom(),this.renderItemLeftCount(),e.value=""}deleteTodoInTodos(e){const t=this.todos.findIndex(d=>d.id===e);this.todos.splice(t,1)}deleteTodoInDOM(e){this.domEl.querySelector("[data-id='"+e+"']").remove()}async deleteTodo(e){const t=await l.deleteTodo(e);console.log(t),t.ok&&(this.deleteTodoInTodos(e),this.deleteTodoInDOM(e),this.renderItemLeftCount())}async toggleCompletedOneById(e){const t=this.todos.find(o=>o.id==e);t.completed=!t.completed,(await l.updateOne(t)).ok&&(this.domEl.querySelector("[data-id='"+e+"']").classList.toggle("completed"),this.renderItemLeftCount())}async updateOneById(e,t){const d=this.todos.find(n=>n.id==e);d.content=t,(await l.updateOne(d)).ok&&(this.domEl.querySelector("[data-id='"+e+"']").classList.remove("editing"),this.domEl.querySelector("[data-id='"+e+"'] label").innerText=d.content)}}window.todolist=new p({el:"#app",apiUrl:"https://691b0e532d8d7855757146d3.mockapi.io/"});
