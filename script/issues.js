let allIssues = []

const loadIssues = async (status = "all") => {

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json()

allIssues = data.data

let issues = allIssues

// filter for tab
if(status !== "all"){
issues = allIssues.filter(issue => issue.status === status)
}

// update counts
updateCounts(issues)

displayIssues(issues)

}

loadIssues()


const updateCounts = (issues) => {

document.getElementById("issueCount").innerText = issues.length + " Issues"

const openIssues = allIssues.filter(issue => issue.status === "open")
const closeIssues = allIssues.filter(issue => issue.status === "closed")

document.getElementById("openCount").innerText = "Open (" + openIssues.length + ")"
document.getElementById("closeCount").innerText = "Closed (" + closeIssues.length + ")"

}




const displayIssues = (issues) => {

const container = document.getElementById("issuesContainer")

container.innerHTML = ""

issues.forEach(issue => {

const borderColor =
issue.status === "open"
? "border-green-500"
: "border-purple-500"

const card = document.createElement("div")

card.className =
`border-t-4 ${borderColor} p-4 shadow rounded bg-white`

card.innerHTML = `
<div onclick="showIssue(${issue.id})">
 <div class='flex justify-between'>
 <p class='text-amber-400 text-2xl rounded-full'><i class="fa-regular fa-circle-check"></i></p>
  <p class='bg-[#4A00FF] text-white px-2 py-0.5 rounded-md'>${issue.priority}</p>
 </div>
<h3 class="font-bold text-lg mt-4">${issue.title}</h3>

<p class="text-sm text-gray-500">${issue.description}</p>

<p>Status: ${issue.status}</p>
<p>Category: ${issue.category}</p>
<p>Priority: ${issue.priority}</p>
<p>Author: ${issue.author}</p>
<p>Label: ${issue.label}</p>
<hr class="text-gray-200 mt-4"/>
<div class="mt-4">
 <p>#1 by_john_doe</p>
 <p>1/15/2024</p>
</div>
</div>
`

container.appendChild(card)

})

}



const showIssue = async (id) => {

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data = await res.json()

const issue = data.data



 const detailsBox = document.getElementById('details-container')
   detailsBox.innerHTML=`
   <div class="">
        <h2 class="text-2xl font-bold"> Title: ${issue.title}</h2>
      </div>
      <div class="">
        
        <p>Description: ${issue.description}</p>
      </div>
      <div class="">
      
        <p>Status: ${issue.status}</p>
      </div>
      <div class="">
        
         <div>Category: ${issue.category}</div>
      </div>
      <div class="">
        
         <div>Priority: ${issue.priority}</div>
      </div>
      <div class="">
        
         <div>Author: ${issue.author}</div>
      </div>
      <div class="">
        
         <div>Label: ${issue.label}</div>
      </div>
   `
   document.getElementById('word_modal').showModal()

}

