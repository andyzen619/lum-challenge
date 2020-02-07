const fs = require("fs").promises;

//Let k = user, n = jobs

/**
 * Returns and object that groups jobs by tags
 * @param {} jobs 
 */
const getJobsByTags = jobs => {
  const tags = {};

  //O(n)
  jobs.forEach(job => {
    job.tags.forEach(tag => {
      if (!tags[tag]) {
        tags[tag] = [job];
      } else {
        tags[tag].push(job);
      }
    });
  });

  return tags;
};

/**
 * Returns an object that groups jobs by ID
 * @param {*} jobs 
 */
const getJobsById = jobs => {
  const jobsById = {};
  //O(n);
  jobs.forEach(job => {
    jobsById[job.id] = job;
  });
  return jobsById;
};

/**
 * Returns and object of all jobs that match the user specified tags
 * @param {*} user 
 * @param {*} tags 
 */
const getJobsForUser = (user, tags) => {
  const userJobs = {};
  user.tags.forEach(tag => {
    //O(n)
    tags[tag].forEach(job => {
      if (!userJobs[job.id]) {
        userJobs[job.id] = 1;
      } else {
        userJobs[job.id]++;
      }
    });
  });
  return userJobs;
};

/**
 * Prints jobs that contains two of the users specified tags
 * @param {*} userJobs 
 * @param {*} jobsById 
 * @param {*} user 
 */
const printResults = (userJobs, jobsById, user) => {
  //O(n)
  Object.keys(userJobs).forEach(key => {
    if (userJobs[key] >= 2) {
      console.log(`User ${user.id} matched to`, jobsById[key]);
    }
  });
}

/**
 * Finds all job matches for all users
 */
const findAllJobs = async () => {
  const users = JSON.parse(await fs.readFile("users.json"));
  const jobs = JSON.parse(await fs.readFile("jobs.json"));

  //O(n) each
  const tags = getJobsByTags(jobs);
  const jobsById = getJobsById(jobs);

  //O(k)
  users.forEach(user => {
    //O(n)
    const userJobs = getJobsForUser(user, tags);
    printResults(userJobs, jobsById, user);
  });
};

console.time('findAllJobs');
findAllJobs();
console.timeEnd('findAllJobs')
