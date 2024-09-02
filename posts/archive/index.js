var posts = new XMLHttpRequest();
posts.open('GET', '../posts.json', true);
posts.onreadystatechange = function() {
    if (posts.readyState === 4 && posts.status === 200) {
        const postsReadable = JSON.parse(posts.responseText);
        console.log("hello?");
        for (let i = 0; i < postsReadable.length; i++) {
            let newElement = document.createElement("a");
            newElement.href = "../post.html?post="+postsReadable[i];
            newElement.text = postsReadable[i];
            let newBr = document.createElement("br");
            document.getElementById("allposts").appendChild(newElement);
            document.getElementById("allposts").appendChild(newBr);
        }
    }
}
posts.send();