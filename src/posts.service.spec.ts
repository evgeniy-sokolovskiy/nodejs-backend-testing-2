import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      expect(postsService.findMany().length).toBe(posts.length);
      expect(postsService.findMany()).toEqual(posts.map((post, index) => ({
        ...post,
        id: String(index+1)
      })));
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
      const LIMIT = 3
      const SKIP = 3
      const found = postsService.findMany({skip: SKIP, limit: LIMIT});
      expect(found.length).toEqual(LIMIT);
      expect(found).toEqual(posts.slice(SKIP, LIMIT));
    });

    // реализуйте недостающие тест-кейсы
    it('should return a part of posts with skip', () => {
      const SKIP = 1
      const diffPostsLength = posts.length - SKIP
      const found = postsService.findMany({skip: SKIP});
      expect(found.length).toEqual(diffPostsLength);
      expect(found).toEqual(
          posts.map((post, index) => ({
            ...post,
            id: String(index+1)
          })).slice(SKIP));
    });

    it('should return a part of posts with limit', () => {
      const LIMIT = 3
      const found = postsService.findMany({limit: LIMIT});
      expect(found.length).toEqual(LIMIT);
      expect(found).toEqual(
          posts.map((post, index) => ({
            ...post,
            id: String(index+1)
          })).slice(0, LIMIT));
    });
  });
});
