import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaFileAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex flex-col items-center justify-center p-4 md:p-8 transition-all duration-300">
      <main className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition hover:scale-102 hover:shadow-purple-300/50 duration-300">
        <div className="bg-purple-500 h-16 w-full relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-purple-100 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-extrabold text-purple-600">RK</span>
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-6 md:px-8">
          <h1 className="text-3xl font-bold text-center text-purple-700">Ranvijay Kumar</h1>
          <p className="text-center text-purple-500 font-medium mt-1">Frontend Developer</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center p-3 bg-purple-100 rounded-lg hover:bg-purple-200 transition duration-200">
              <FaEnvelope className="text-purple-500 mr-3" />
              <span className="text-gray-700 group-hover:text-purple-600 transition">ranvijay7021@gmail.com</span>
            </div>

            <div className="flex items-center p-3 bg-purple-100 rounded-lg hover:bg-purple-200 transition duration-200">
              <FaPhone className="text-purple-500 mr-3" />
              <span className="text-gray-700 group-hover:text-purple-600 transition">+91-7357237233</span>
            </div>

            <a 
              href="https://drive.google.com/file/d/1P7-JYPpHxaACT2fo1ZwCgLbayA_1s_bk/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-purple-100 rounded-lg hover:bg-purple-200 group transition duration-200"
            >
              <FaFileAlt className="text-purple-500 mr-3 group-hover:text-purple-600 transition" />
              <span className="text-gray-700 group-hover:text-purple-600 transition">View My Resume</span>
            </a>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <a 
              href="https://github.com/rvk7021" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-purple-100 rounded-full hover:bg-purple-200 group transition duration-200"
            >
              <FaGithub className="text-purple-600 text-xl group-hover:text-purple-700 transition" />
            </a>
            <a 
              href="https://www.linkedin.com/in/ranvijay-kumar-825457255/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-purple-100 rounded-full hover:bg-purple-200 group transition duration-200"
            >
              <FaLinkedin className="text-purple-600 text-xl group-hover:text-purple-700 transition" />
            </a>
          </div>

          {/* Buttons Section */}
          <div className="mt-8 flex flex-col items-center space-y-4">
            <Link href="/products" passHref>
              <button className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transform transition hover:scale-102 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 font-medium shadow-md duration-300">
                View My Assignment
              </button>
            </Link>

            {/* Portfolio Button */}
            <a
              href="https://ranvijayk.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transform transition hover:scale-102 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 font-medium shadow-md duration-300 text-center"
            >
              Visit My Portfolio
            </a>
          </div>
        </div>
      </main>

      <div className="mt-8 w-full max-w-lg">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-purple-300/50 transition duration-300">
          <h2 className="text-xl font-semibold text-purple-700 mb-3">About Me</h2>
          <p className="text-gray-600">
            Passionate frontend developer with experience building responsive and intuitive user interfaces.
            Skilled in modern JavaScript frameworks, UI/UX principles, and creating performant web applications.
          </p>
        </div>
      </div>
      <footer className="mt-12 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Ranvijay Kumar. All rights reserved.
      </footer>
    </div>
  );
}
