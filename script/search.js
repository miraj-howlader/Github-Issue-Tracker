const searchIssue = async () => {

const text =
document.getElementById("searchInput").value

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)

const data = await res.json()

displayIssues(data.data)

}


document.getElementById("spinner").classList.remove("hidden")

// after load

document.getElementById("spinner").classList.add("hidden")