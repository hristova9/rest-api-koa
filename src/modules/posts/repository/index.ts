import postLocalRepository from './post.repository';

const dbs = {
  local: postLocalRepository,
};

export const postRepository = postLocalRepository;