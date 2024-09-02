// import {MarkdownBlock, MarkdownSpan, MarkdownElement} from "https://md-block.verou.me/md-block.js";

const url = new URL(document.URL);
const postName = url.searchParams.get("post");

var xhr = new XMLHttpRequest();
xhr.open('GET', './'+postName+'.json', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const parsedPost = JSON.parse(xhr.responseText);
        document.title = parsedPost.title;

        let title = document.getElementById("postTitle");
        let thumbnail = document.getElementById("postThumb");
        let readTime = document.getElementById("postRead");
        title.innerHTML = parsedPost.title;
        readTime.innerHTML = parsedPost.readtime;
        thumbnail.src = parsedPost.thumbnail;


        let postMd = document.createElement("md-block");
        // let postText = document.getElementById("postText");
        postMd.src = "./"+postName+".md";
        document.getElementById("postDiv").appendChild(postMd);
    }
};
xhr.send();