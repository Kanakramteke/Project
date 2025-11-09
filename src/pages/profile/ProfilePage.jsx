import React from 'react';

function ProfilePage() {
  const handleNameChange = (value) => {
    console.log('Name changed:', value);
  };

  const handleSaveDetails = (name) => {
    console.log('Saving details:', name);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-black dark:text-white font-bold text-lg">Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Enter your name"
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-black dark:text-white font-bold text-lg">Contact Number</label>
                  <input type="text" className="w-full mt-1 p-2 border rounded" placeholder="Enter your contact number" />
                </div>
                <div>
                  <label className="block text-black dark:text-white font-bold text-lg">Email</label>
                  <input type="email" className="w-full mt-1 p-2 border rounded" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-black dark:text-white font-bold text-lg">College Name</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option value="">Select your college</option>
                    <option value="RTMNU">Rashtrasant Tukadoji Maharaj Nagpur University</option>
                    <option value="VNIT">Visvesvaraya National Institute of Technology</option>
                    <option value="GHRCE">G.H. Raisoni College of Engineering</option>
                    <option value="YCCE">Yeshwantrao Chavan College of Engineering</option>
                    <option value="PIET">Priyadarshini Institute of Engineering and Technology</option>
                    <option value="LIT">Laxminarayan Institute of Technology</option>
                    <option value="SJCE">St. John College of Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-black dark:text-white font-bold text-lg">Skills</label>
                  <textarea className="w-full mt-1 p-2 border rounded" placeholder="Enter your skills"></textarea>
                </div>
                <div>
                  <label className="block text-black dark:text-white font-bold text-lg">Social Links</label>
                  <textarea className="w-full mt-1 p-2 border rounded" placeholder="Enter your social links"></textarea>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleSaveDetails(document.querySelector('input[placeholder=\"Enter your name\"]').value)}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;