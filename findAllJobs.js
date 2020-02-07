const fs = require("fs").promises;

//Let n = user, m = jobs

/**
 * Returns and object that groups jobs by tags
 * @param {} jobs 
 */
const getJobsByTags = jobs => {
  const tags = {};

  //O(m)
  jobs.forEach(job => {
    //O(3)
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
  //O(m);
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
  //O(3)
  user.tags.forEach(tag => {
    //O(m)
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
  //O(m)
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

  //O(m) each
  const tags = getJobsByTags(jobs);
  const jobsById = getJobsById(jobs);

  //O(n)
  users.forEach(user => {
    //O(m)
    const userJobs = getJobsForUser(user, tags);
    printResults(userJobs, jobsById, user);
  });
};

console.time('findAllJobs');
findAllJobs();
console.timeEnd('findAllJobs')
