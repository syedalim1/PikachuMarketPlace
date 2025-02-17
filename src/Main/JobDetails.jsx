import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../Common/Header';
import Footer from './Footer';
import LoadingSpinner from '../Common/LoadingSpinner';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [similarJobs, setSimilarJobs] = useState([]);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(`/api/jobs/${id}`);
        const data = await response.json();
        setJob(data);
        // Fetch similar jobs
        const similarResponse = await fetch(`/api/jobs/similar/${id}`);
        const similarData = await similarResponse.json();
        setSimilarJobs(similarData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <motion.div
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Job Header */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{job?.title}</h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {job?.company}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {job?.salary}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              {job?.location}
            </span>
          </div>
        </motion.div>

        {/* Job Description */}
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <motion.div 
            className="md:col-span-2 bg-white rounded-lg shadow-lg p-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <div className="prose max-w-none">
              {job?.description}
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              {job?.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>

            <motion.button
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg
                         hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setApplying(true)}
            >
              Apply Now
            </motion.button>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="md:col-span-1 space-y-6"
            variants={containerVariants}
          >
            {/* Company Info */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4">Company Information</h3>
              <div className="space-y-3">
                <p><strong>Industry:</strong> {job?.industry}</p>
                <p><strong>Company Size:</strong> {job?.companySize}</p>
                <p><strong>Founded:</strong> {job?.founded}</p>
              </div>
            </motion.div>

            {/* Similar Jobs */}
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-6"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {similarJobs.map((similarJob) => (
                  <Link 
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  >
                    <h4 className="font-semibold">{similarJob.title}</h4>
                    <p className="text-sm text-gray-600">{similarJob.company}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Application Modal */}
      <AnimatePresence>
        {applying && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Apply for {job?.title}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Resume</label>
                  <input 
                    type="file" 
                    className="w-full p-2 border rounded-lg"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cover Letter</label>
                  <textarea 
                    className="w-full p-2 border rounded-lg"
                    rows="4"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setApplying(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg
                             hover:bg-blue-700 transition-colors duration-300"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default JobDetails; 