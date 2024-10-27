// src/app/AboutUs/page.tsx

import Link from 'next/link';

export default function AboutUs() {
  return (
    <>
      {/* Navbar */}
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/AboutUs">About Us</Link></li>
          <li><Link href="/Calculator">Calculator</Link></li>
          <li><Link href="/leaderboard">Leaderboard</Link></li>
          <li>
            <Link href="#">Registration</Link>
            <ul className="dropdown">
              <li><Link href="/Register">Register</Link></li>
              <li><Link href="/Login">Login</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      {/* Problem Section */}
      <div className="issue">
        <h2>Problem:</h2>
        <p>
          The primary issue with excessive carbon emissions is that it contributes significantly 
          to global warming by trapping heat in the Earth atmosphere, leading to climate change 
          with severe impacts like rising sea levels, extreme weather events, disruptions to ecosystems, 
          and potential threats to human health and food security.
        </p>
      </div>
        
      {/* Objective Section */}
      <div className="objective">
        <h2>Objective:</h2>
        <p>
          Our objective with this website is to show users the amount of carbon emission that is produced 
          every day with everyday use of public transportation and high usage of electricity. With China
          carbon emission being as high as 32%, we wish to try to bring those numbers down to as low as 15%.
          We will do this by creating a database that stores information given by users on the average amount of gas they use driving
          and electricity they use and provide them with ways to reduce their carbon emissions. The more carbon emissions that are 
          reduced per user, the higher they would be on a leaderboard that showcases users who are working on reducing the amount
          of carbon emissions they are producing.
        </p>
      </div>

      {/* Carbon Emissions by Country Table */}
      <div className="emission-table">
        <h2>Top Countries by Carbon Emissions</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Country</th>
              <th>Annual CO₂ Emissions (Million Tons)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>China</td>
              <td>10,065</td>
            </tr>
            <tr>
              <td>2</td>
              <td>United States</td>
              <td>5,416</td>
            </tr>
            <tr>
              <td>3</td>
              <td>India</td>
              <td>2,654</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Russia</td>
              <td>1,711</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Japan</td>
              <td>1,162</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
