// handle all the requests
import axios from 'axios';

const url = 'http://localhost:3000/api/posts/';


class PostService {
    // Get Posts
    static getPosts() {
        /*
        return new Promise((resolve, reject) => {
            try{
                const res = axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Data(post.createdAt)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
        */
       return axios.get(url);






    }

    // Create Post
    static insertPost(payload) {
        console.log(payload);
        return axios.post(url, payload);
    }

    static updatePost(id) {
        return axios.post(url+ "/" + id)
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(url+ "/" + id)
       // return axios.delete('${url}${id}');
    }

}

export default PostService;