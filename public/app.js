(()=>{let e=[],t=null,n=null,o=null;function a(){const t=document.getElementById("newFolderName").value;if(t){const n={id:Math.floor(1e4+9e4*Math.random()).toString(),name:t,sets:[]};fetch(`http://localhost:3000/api/create-folder?folderId=${n.id}&folderName=${n.name}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to create folder");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)})),e.push(n),B(),f(),document.getElementById("newFolderName").value=""}}function i(){const e=document.getElementById("newSetName").value;if(e&&t){const o={id:Math.floor(1e4+9e4*Math.random()).toString(),name:e,title:"",description:"",tags:[],flashcards:[]};console.log(t),fetch(`http://localhost:3000/api/create-set?setId=${o.id}&setName=${o.name}&setTitle=${o.title}&setDescription=${o.description}&folderId=${t.id}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to create set");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)})),t.sets.push(o),n=o,B(),g(),p(),document.getElementById("newSetName").value=""}}function c(e){t&&(t.sets=t.sets.filter((t=>t.id!==e)),console.log(set.id),fetch(`http://localhost:3000/api/delete-set?setId=${e}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to delete set");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)})),B(),g())}function l(e){e.parentNode.removeChild(e),fetch(`http://localhost:3000/api/delete-flashcard?cardId=${e.dataset.id}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to delete folder");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)})),k(),h()}function r(){if(n){console.log(n),n.title=document.getElementById("set-title").value,n.description=document.getElementById("set-description").value,n.tags=document.getElementById("set-tags").value.split(",").map((e=>e.trim())),fetch(`http://localhost:3000/api/update-set?setId=${n.id}&setTitle=${n.title}&setDescription=${n.description}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to update set");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)}));for(let e of n.flashcards){console.log(e);const t=e.id,n=e.term,o=e.definition;fetch(`http://localhost:3000/api/update-flashcard?cardId=${t}&cardTitle=${n}&cardDef=${o}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to update flashcard");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)}))}t.sets.push(set),n=set,B(),g(),p(),document.getElementById("newSetName").value=""}}function c(e){if(t){t.sets=t.sets.filter((t=>t.id!==e)),fetch(`http://localhost:3000/api/delete-set?setId=${e}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to delete set");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)})),console.log(n.flashcards);const o=document.querySelectorAll(".flashcard"),a=Array.from(o).map((e=>{const t=e.querySelector('input[type="text"]').value,n=e.querySelector("textarea").value,o=e.querySelectorAll('input[type="file"]')[0],a=e.querySelectorAll('input[type="file"]')[1],i=o.files[0],c=a.files[0],l={id:e.dataset.id,term:t,definition:n,termImage:o.dataset.image||null,definitionImage:a.dataset.image||null};return console.log(l),new Promise((e=>{if(i){const t=new FileReader;t.onload=function(t){l.termImage=t.target.result,e(l)},t.readAsDataURL(i)}else if(c){const t=new FileReader;t.onload=function(t){l.definitionImage=t.target.result,e(l)},t.readAsDataURL(c)}else e(l)}))}));Promise.all(a).then((e=>{n.flashcards=e,B(),w("Set saved successfully!"),m(),u("preview"),h()})).catch((e=>{console.error("Error saving flashcards:",e)}))}}function s(){n&&(document.getElementById("set-title").value=n.title,document.getElementById("set-description").value=n.description,document.getElementById("set-tags").value=n.tags.join(", "),function(){const e=document.getElementById("flashcards-container");e.innerHTML="",n&&n.flashcards.forEach((t=>{const n=document.createElement("div");n.classList.add("flashcard"),n.dataset.id=t.id,n.innerHTML=`\n        <input type="text" value="${t.term}">\n        <textarea>${t.definition}</textarea>\n        <input type="file" accept="image/*" ${t.termImage?'data-image="'+t.termImage+'"':""}>\n        <img src="${t.termImage||""}" alt="" style="display: ${t.termImage?"block":"none"};">\n        <input type="file" accept="image/*" ${t.definitionImage?'data-image="'+t.definitionImage+'"':""}>\n        <img src="${t.definitionImage||""}" alt="" style="display: ${t.definitionImage?"block":"none"};">\n        <button id="deleteFlashcardButton">Delete</button>\n      `,e.appendChild(n),n.querySelector("#deleteFlashcardButton").addEventListener("click",(function(){l(n)}))}))}(),h(),u("edit"))}function d(){n&&(o=0,y(),u("practice"))}function m(){const e=document.getElementById("flashcards-preview");e.innerHTML="",n&&n.flashcards.forEach((t=>{const n=document.createElement("div");n.classList.add("flashcard-preview"),n.dataset.id=t.id,n.innerHTML=`\n        <h3>${t.term}</h3>\n        <p>${t.definition}</p>\n      `,e.appendChild(n)}))}function u(e){const t=document.querySelectorAll(".edit-mode"),n=document.querySelectorAll(".preview-mode"),o=document.querySelectorAll(".practice-mode");"edit"===e?(k(),t.forEach((e=>e.style.display="block")),n.forEach((e=>e.style.display="none")),o.forEach((e=>e.style.display="none"))):"preview"===e?(S(),t.forEach((e=>e.style.display="none")),n.forEach((e=>e.style.display="block")),o.forEach((e=>e.style.display="none"))):"practice"===e&&(S(),t.forEach((e=>e.style.display="none")),n.forEach((e=>e.style.display="none")),o.forEach((e=>e.style.display="block")))}function f(){const n=document.getElementById("folderList");n.innerHTML="",e.forEach((o=>{const a=document.createElement("li");a.textContent=o.name,a.onclick=function(){var e;t=o,g(),e=o.id,document.querySelectorAll("#folderList li").forEach((t=>{t.classList.remove("active"),t.textContent.includes(e)&&t.classList.add("active")}))};const i=document.createElement("button");i.textContent="Delete",i.onclick=function(t){var n;t.stopPropagation(),n=o.id,e=e.filter((e=>e.id!==n)),fetch(`http://localhost:3000/api/delete-folder?folderId=${n}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to delete folder");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)})),B(),f()},a.appendChild(i),n.appendChild(a)}))}function g(){const o=document.getElementById("setList");o.innerHTML="",t&&t.sets.forEach((t=>{const a=document.createElement("li");a.textContent=t.name,a.onclick=function(){var o;o=t.id,n=function(t){for(const n of e){const e=n.sets.find((e=>e.id===t));if(e)return e}return null}(o),n&&(document.getElementById("set-title-preview").textContent="Title: "+n.title,document.getElementById("set-description-preview").textContent="Description: "+n.description,document.getElementById("set-tags-preview").textContent="Tags: "+n.tags.join(", "),m(),h(),u("preview"))};const i=document.createElement("button");i.textContent="Delete",i.onclick=function(e){e.stopPropagation(),c(t.id)},a.appendChild(i),o.appendChild(a)}))}function p(){n&&(document.getElementById("set-title").value=n.title,document.getElementById("set-description").value=n.description,document.getElementById("set-tags").value=n.tags.join(", "))}function h(){n&&n.flashcards.length>0?(o=0,y()):(document.getElementById("questionText").textContent="",document.getElementById("answerText").textContent="",document.getElementById("questionImage").src="",document.getElementById("answerImage").src="")}function y(){if(n&&null!==o){const e=n.flashcards[o];document.getElementById("questionText").textContent=e.term,document.getElementById("answerText").textContent=e.definition;const t=document.getElementById("questionImage"),a=document.getElementById("answerImage");e.termImage?(t.src=e.termImage,t.style.display="block"):(t.src="",t.style.display="none"),e.definitionImage?(a.src=e.definitionImage,a.style.display="block"):(a.src="",a.style.display="none")}}function E(){null!==o&&o>0&&(o--,y())}function I(){n&&null!==o&&o<n.flashcards.length-1&&(o++,y())}function v(){const e=document.getElementById("search-terms").value.toLowerCase();document.querySelectorAll(".flashcard").forEach((t=>{const n=t.querySelector('input[type="text"]').value.toLowerCase(),o=t.querySelector("textarea").value.toLowerCase();n.includes(e)||o.includes(e)?t.style.display="block":t.style.display="none"}))}function B(){localStorage.setItem("flashcardData",JSON.stringify(e))}function w(e){const t=document.getElementById("notifications"),n=document.createElement("div");n.textContent=e,t.appendChild(n),setTimeout((()=>{t.removeChild(n)}),3e3)}function L(){if(n){n.title=document.getElementById("set-title").value,n.description=document.getElementById("set-description").value,n.tags=document.getElementById("set-tags").value.split(",").map((e=>e.trim()));const e=document.querySelectorAll(".flashcard"),t=Array.from(e).map((e=>{const t=e.querySelector('input[type="text"]').value,n=e.querySelector("textarea").value,o=e.querySelectorAll('input[type="file"]')[0],a=e.querySelectorAll('input[type="file"]')[1],i=o.files[0],c=a.files[0],l={id:e.dataset.id,term:t,definition:n,termImage:o.dataset.image||null,definitionImage:a.dataset.image||null};return new Promise((e=>{if(i){const t=new FileReader;t.onload=function(t){l.termImage=t.target.result,e(l)},t.readAsDataURL(i)}else if(c){const t=new FileReader;t.onload=function(t){l.definitionImage=t.target.result,e(l)},t.readAsDataURL(c)}else e(l)}))}));Promise.all(t).then((e=>{n.flashcards=e,B(),w("Autosave: Set saved successfully!"),h()})).catch((e=>{console.error("Error autosaving flashcards:",e)}))}}function k(){const e=document.getElementById("set-title"),t=document.getElementById("set-description"),n=document.getElementById("set-tags");e.addEventListener("input",L),t.addEventListener("input",L),n.addEventListener("input",L),A.addEventListener("input",(function(e){e.target.matches(".flashcard input, .flashcard textarea")&&L()})),A.addEventListener("click",(function(e){e.target.matches(".flashcard button")&&L()}))}function S(){const e=document.getElementById("set-title"),t=document.getElementById("set-description"),n=document.getElementById("set-tags");e.removeEventListener("input",L),t.removeEventListener("input",L),n.removeEventListener("input",L),A.removeEventListener("input",(function(e){e.target.matches(".flashcard input, .flashcard textarea")&&L()})),A.removeEventListener("click",(function(e){e.target.matches(".flashcard button")&&L()}))}function $(){document.getElementById("pdf-modal").style.display="block"}function x(){document.getElementById("pdf-modal").style.display="none"}async function C(){const e=document.getElementById("pdf-upload").files[0],t=document.getElementById("openai-api-key").value,n=document.getElementById("custom-instructions").value;if(!e||!t)return void alert("Please select a PDF file and provide an OpenAI API key.");const o=await async function(e){return new Promise(((t,n)=>{const o=new FileReader;o.onload=async function(e){const n=new Uint8Array(e.target.result),o=await pdfjsLib.getDocument(n).promise;let a="";for(let e=1;e<=o.numPages;e++){const t=await o.getPage(e);a+=(await t.getTextContent()).items.map((e=>e.str)).join(" ")+"\n"}t(a)},o.onerror=function(e){n(e)},o.readAsArrayBuffer(e)}))}(e),a=await async function(e,t,n){const o=`Generate flashcards from the following text. Please respond strictly and only with flashcard term-definition pairs in the format "Term :: Definition", with different Term :: Definition pairs separated by a new line. Make sure to provide both the term and the definition for each flashcard.\n\n${n}\n\nText: ${e}\n\nFlashcards:\n`,a=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:"gpt-3.5-turbo-0125",messages:[{role:"user",content:o}]})}),i=await a.json();console.log(i);const c=i.choices[0].message.content.trim();console.log("Generated Text:",c);const l=function(e){console.log("Input text: ",e);const t=e.split("\n"),n=[];for(const e of t){console.log("Processing line: ",e);const t=e.split("::").map((e=>e.trim()));if(2===t.length){let[e,o]=t;if(console.log("Term: ",e),console.log("Definition: ",o),!e&&o){const t=o.indexOf(":");-1!==t&&(e=o.slice(0,t).trim(),o=o.slice(t+1).trim())}e&&o&&n.push({term:e,definition:o})}}return console.log("Generated flashcards: ",n),n}(c);return l}(o,t,n);a.forEach((e=>{T(e.term,e.definition)})),x()}function T(e="term",t="definition"){const o=document.createElement("div");o.classList.add("flashcard"),o.dataset.id=Math.floor(1e4+9e4*Math.random()).toString(),o.innerHTML=`\n    <input type="text" placeholder="Enter term" value="${q(e)}">\n    <textarea placeholder="Enter definition">${q(t)}</textarea>\n    <input type="file" accept="image/*">\n    <img src="" alt="" style="display: none;">\n    <input type="file" accept="image/*">\n    <img src="" alt="" style="display: none;">\n    <button id="deleteFlashcardButton">Delete</button>\n  `,A.appendChild(o),fetch(`http://localhost:3000/api/create-flashcard?cardId=${o.dataset.id}&cardTitle=term&cardDef=${t}&setId=${n.id}`).then((e=>{if(console.log(e),!e.ok)throw new Error("Failed to create folder");return e.json()})).then((e=>{console.log("Success:",e)})).catch((e=>{console.error("Error:",e)})),o.querySelector("#deleteFlashcardButton").addEventListener("click",(function(){l(o)})),h()}function q(e){if("string"==typeof e){const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return e.replace(/[&<>"']/g,(function(e){return t[e]}))}return""}const b=document.getElementById("add-flashcard"),A=document.getElementById("flashcards-container");b.addEventListener("click",T),document.getElementById("save-set").addEventListener("click",r),document.getElementById("search-terms").addEventListener("input",v),document.getElementById("edit-set").addEventListener("click",s),document.getElementById("practice-set").addEventListener("click",d),document.getElementById("open-pdf-modal").addEventListener("click",$),document.querySelector(".close").addEventListener("click",x),document.getElementById("generate-flashcards").addEventListener("click",C),document.addEventListener("DOMContentLoaded",(function(){document.getElementById("createFolderButton").addEventListener("click",a),document.getElementById("createSetButton").addEventListener("click",i),document.getElementById("previousButton").addEventListener("click",E),document.getElementById("nextButton").addEventListener("click",I),document.getElementById("flashcard").addEventListener("click",(function(){this.classList.toggle("is-flipped")})),document.getElementById("save-set").addEventListener("click",r),document.getElementById("search-terms").addEventListener("input",v),document.getElementById("edit-set").addEventListener("click",s),document.getElementById("practice-set").addEventListener("click",d),document.getElementById("open-pdf-modal").addEventListener("click",$),document.querySelector(".close").addEventListener("click",x),document.getElementById("generate-flashcards").addEventListener("click",C)})),function(){const t=localStorage.getItem("flashcardData");t&&(e=JSON.parse(t),f(),h())}(),function(){const e=new URLSearchParams(window.location.search).get("id");if(e){const t=localStorage.getItem("flashcardData");if(t){const o=JSON.parse(t);for(const t of o){const o=t.sets.find((t=>t.id===e));if(o){n=o;break}}}}}(),u(),"edit"===new URLSearchParams(window.location.search).get("mode")&&(function(){if(n){document.getElementById("set-title").value=n.title,document.getElementById("set-description").value=n.description,document.getElementById("set-tags").value=n.tags.join(", ");const e=document.getElementById("flashcards-container");e.innerHTML="",flashcardElement.querySelector("button").addEventListener("click",(function(){l(flashcardElement)})),n.flashcards.forEach((t=>{const n=document.createElement("div");n.classList.add("flashcard"),n.dataset.id=t.id,n.innerHTML=`\n        <input type="text" value="${t.term||""}">\n        <textarea>${t.definition||""}</textarea>\n        <input type="file" accept="image/*" ${t.termImage?'data-image="'+t.termImage+'"':""}>\n        <img src="${t.termImage||""}" alt="" style="display: ${t.termImage?"block":"none"};">\n        <input type="file" accept="image/*" ${t.definitionImage?'data-image="'+t.definitionImage+'"':""}>\n        <img src="${t.definitionImage||""}" alt="" style="display: ${t.definitionImage?"block":"none"};">\n\n      `,e.appendChild(n)})),k()}}(),k())})();