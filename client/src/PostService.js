// handle all the requests
import axios from 'axios';

const url = 'http://localhost:3000/api/posts/';


class PostService {
    // Get Posts
    static getPosts() {
       return axios.get(url);
    }

    // Create Post
    static insertPost(payload) {
        return axios.post(url, payload);
    }

    static updatePost(id, payload) {
        return axios.post(url+ "/" + id, payload);
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(url+ "/" + id);
       // return axios.delete('${url}${id}');
    }

}

export default PostService;