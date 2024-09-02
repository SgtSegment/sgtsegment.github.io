function parseBlogPost(name) {
    const name2 = name.toString();
    var post = "";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './posts/'+name2+'.json', true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var testDiv = document.getElementById(name2);
            var divElements = testDiv.querySelectorAll("p");
            post = xhr.responseText;
            const parsedPost = JSON.parse(post);
            console.log(parsedPost.title);
            console.log(parsedPost.snippet);
            for (let element of divElements) {
                switch (element.id) {
                    case "title":
                        element.innerHTML = parsedPost.title;
                        break;
                    case "snippet":
                        element.innerHTML = parsedPost.snippet;
                        break;
                }
            }
        }
    };
    xhr.send();
}
var posts = new XMLHttpRequest();
posts.open('GET', './posts/posts.json', true);
posts.onreadystatechange = function() {
    if (posts.readyState === 4 && posts.status === 200) {
        const postsReadable = JSON.parse(posts.responseText);
        console.log("hello?");
        finishCreation(postsReadable);
    }
}
posts.send();

function finishCreation(postsReadable) {
    console.log(postsReadable.length);
    for (let i = 0; i < postsReadable.length; i++) {
        console.log(postsReadable[i]);
        if (i < 2) {
        console.log(postsReadable[i]);
        createPostDivs(postsReadable, i);
    }}
}

function createPostDivs(postsReadable, i) {
    var post = new XMLHttpRequest();
        var postUrl = './posts/'+postsReadable[i]+'.json';
        post.open('GET', postUrl);
        post.send();
        post.onreadystatechange = function() {
            console.log(post.responseURL);
            console.log(postUrl);
            if (post.readyState === 4 && post.status === 200) {
                console.log("HTML REQUEST");
                const postMeta = JSON.parse(post.responseText);
                
                let mainDiv = document.createElement("div");
                mainDiv.className = "post";
                mainDiv.id = postsReadable[i];
                document.getElementById("elPosts").appendChild(mainDiv);
                
                let title = document.createElement("p");
                title.id = "title";
                title.className = "titletxt";
                title.innerHTML = postMeta.title;
                mainDiv.appendChild(title);
        
                let snippet = document.createElement("p");
                snippet.id = "snippet";
                snippet.className = "snippettxt";
                snippet.innerHTML = postMeta.snippet;
                mainDiv.appendChild(snippet);

                let br1 = document.createElement("br");
                mainDiv.appendChild(br1);
                let br2 = document.createElement("br");
                mainDiv.appendChild(br2);
                let br3 = document.createElement("br");
                mainDiv.appendChild(br3);

                let fullPost = document.createElement("button");
                fullPost.onclick = function(){
                    window.location.href = "./posts/post.html?post="+postsReadable[i];
                }
                fullPost.innerHTML = "Full Post >>>";
                mainDiv.appendChild(fullPost);

                parseBlogPost(postsReadable[i]);
            }
        }
}
// parseBlogPost("test");

