import {motion} from 'framer-motion'

function Home(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <motion.h1
                className="text-4xl font-bold text-white"
                initial={{opacity: 0.2, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7}}
            >
                Welcome to my Portfolio
            </motion.h1>
            <a
                href="http://127.0.0.1:5000/api/resume"
                download
                className="bg-white text-black font-bold py-3 py-3 rounded"
            >
                Download Resume 
            </a>
        </div>
    )
}
export default Home