import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      {/* Navbar */}
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/AboutUs">About Us</Link></li>
          <li><Link href="/Calculator">Calculator</Link></li>
          <li><Link href="/leaderboard">Leaderboard</Link></li> {/* Updated path here */}
          <li>
            <Link href="#">Registration</Link>
            <ul className="dropdown">
              <li><Link href="/Register">Register</Link></li>
              <li><Link href="/Login">Login</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        {/* Hero Section */}
        <div className="hero text-center bg-green-100 p-10 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Carbon Emission Tracker</h1>
          <p className="mb-6">
            Welcome to the Carbon Emission Tracker! Join us in tracking and reducing your carbon footprint.
          </p>
        </div>

        {/* Hero Buttons in the Body */}
        <div className="button-group flex gap-4 justify-center mt-4">
          <Link href="/Calculator">
            <button className="button1 bg-blue-500 text-white px-6 py-2 rounded">Calculator</button>
          </Link>
          <Link href="/leaderboard">
            <button className="button2 bg-green-500 text-white px-6 py-2 rounded">Leaderboard</button> {/* Updated path here */}
          </Link>
        </div>

        {/* Big Display of Company */}
        <div className="company">
          <h1 className="company">Learn how to track your Carbon Emissions  
            today by using our Carbon Emission Calculator.</h1>
        </div>

        {/* Footer */}
        <footer>
          <p className="footer">&copy; {new Date().getFullYear()} Carbon Emission Tracker. All rights reserved.</p>
        </footer> 
      </main>
    </div>
  );
}
