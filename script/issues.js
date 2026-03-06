const loadIssues = async (status="all") => {

const res = await fetch(
"https://phi-lab-server.vercel.app/api/v1/lab/issues"
)

const data = await res.json()

let issues = data.data

if(status !== "all"){
issues = issues.filter(issue => issue.status === status)
}

displayIssues(issues)

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

<h3 class="font-bold text-lg">${issue.title}</h3>

<p class="text-sm text-gray-500">${issue.description}</p>

<p>Status: ${issue.status}</p>
<p>Category: ${issue.category}</p>
<p>Priority: ${issue.priority}</p>
<p>Author: ${issue.author}</p>
<p>Label: ${issue.label}</p>

<button onclick="showIssue(${issue.id})"
class="text-blue-500 mt-2">View Details</button>

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

alert(`
Title: ${issue.title}

Description: ${issue.description}

Status: ${issue.status}

Category: ${issue.category}

Priority: ${issue.priority}
`)

}