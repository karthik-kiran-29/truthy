import React, { useState } from 'react';

const App = () => {
  // Mock review data
  const initialReviews = [
    {
      id: 1,
      productName: "Sony WH-1000XM5 Headphones",
      reviewerName: "AudioPhile42",
      content: "Best noise cancellation I've ever experienced. Battery life exceeds the advertised 30 hours. The sound quality is incredible for wireless headphones.",
      upvotes: 342,
      downvotes: 12,
      verified: true,
      timestamp: "2025-03-14T10:15:00Z",
      image: "/api/placeholder/60/60"
    },
    {
      id: 2,
      productName: "Ninja Foodi 5-in-1 Air Fryer",
      reviewerName: "CookingMaster",
      content: "Changed my cooking routine completely. Food gets crispy with almost no oil. The multiple functions make it worth every penny.",
      upvotes: 256,
      downvotes: 8,
      verified: true,
      timestamp: "2025-03-15T14:22:00Z",
      image: "/api/placeholder/60/60"
    },
    {
      id: 3,
      productName: "Kindle Paperwhite (2024 Edition)",
      reviewerName: "BookWorm99",
      content: "The waterproof feature and improved battery life make this the best e-reader on the market. Screen clarity is perfect even in direct sunlight.",
      upvotes: 189,
      downvotes: 5,
      verified: true,
      timestamp: "2025-03-16T08:45:00Z",
      image: "/api/placeholder/60/60"
    },
    {
      id: 4,
      productName: "Samsung 55\" OLED TV",
      reviewerName: "TechEnthusiast",
      content: "Colors are vibrant and the blacks are truly black. Gaming performance with 120Hz refresh rate and low latency is impressive. Smart features could use some improvement though.",
      upvotes: 412,
      downvotes: 31,
      verified: true,
      timestamp: "2025-03-12T16:30:00Z",
      image: "/api/placeholder/60/60"
    },
    {
      id: 5,
      productName: "Dyson V15 Vacuum",
      reviewerName: "CleanFreak",
      content: "Powerful suction and great battery life. A bit heavy for extended use, but the cleaning performance makes up for it.",
      upvotes: 175,
      downvotes: 22,
      verified: false,
      timestamp: "2025-03-13T11:10:00Z",
      image: "/api/placeholder/60/60"
    },
  ];

  // State hooks
  const [reviews, setReviews] = useState(initialReviews);
  const [sortType, setSortType] = useState("upvotes");

  // Handle voting
  const handleVote = (id, voteType) => {
    setReviews(prevReviews => 
      prevReviews.map(review => {
        if (review.id === id) {
          if (voteType === 'up') {
            return { ...review, upvotes: review.upvotes + 1 };
          } else if (voteType === 'down') {
            return { ...review, downvotes: review.downvotes + 1 };
          }
        }
        return review;
      })
    );
  };

  // Sort reviews based on sort type
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === "upvotes") {
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    } else if (sortType === "recent") {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="sticky top-0 z-10 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <h1 className="text-xl font-bold text-blue-600">Truthy</h1>
          </div>
          
          <div className="hidden md:block w-1/2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for products or reviews..." 
                className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="absolute right-3 top-2 text-gray-500">
                🔍
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="md:hidden container mx-auto px-4 pb-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="absolute right-3 top-2 text-gray-500">
              🔍
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
        {/* Main feed */}
        <main className="w-full md:w-2/3 lg:w-3/4">
          {/* Sorting options */}
          <div className="bg-white rounded-md shadow mb-4 p-3 flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-full ${sortType === "upvotes" ? "bg-blue-100 text-blue-600" : "bg-gray-100"}`}
              onClick={() => setSortType("upvotes")}
            >
              Most Upvoted
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${sortType === "recent" ? "bg-blue-100 text-blue-600" : "bg-gray-100"}`}
              onClick={() => setSortType("recent")}
            >
              Recent
            </button>
          </div>

          {/* Review posts */}
          <div className="space-y-4">
            {sortedReviews.map(review => (
              <div key={review.id} className="bg-white rounded-md shadow p-4">
                <div className="flex">
                  {/* Voting buttons */}
                  <div className="flex flex-col items-center mr-4">
                    <button 
                      onClick={() => handleVote(review.id, 'up')}
                      className="text-gray-400 hover:text-blue-500 focus:outline-none"
                    >
                      ▲
                    </button>
                    <span className="text-sm font-bold my-1">{review.upvotes - review.downvotes}</span>
                    <button 
                      onClick={() => handleVote(review.id, 'down')}
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                    >
                      ▼
                    </button>
                  </div>
                  
                  {/* Post content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <img 
                        src={review.image} 
                        alt="Product" 
                        className="w-10 h-10 rounded-md mr-3"
                      />
                      <div>
                        <h2 className="font-bold text-lg">{review.productName}</h2>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>Posted by {review.reviewerName}</span>
                          <span className="mx-1">•</span>
                          <span>{new Date(review.timestamp).toLocaleDateString()}</span>
                          {review.verified && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800">{review.content}</p>
                    <div className="mt-3 flex text-gray-500 text-sm">
                      <button className="flex items-center mr-4 hover:text-blue-500">
                        <span className="mr-1">💬</span>
                        Comments
                      </button>
                      <button className="flex items-center mr-4 hover:text-blue-500">
                        <span className="mr-1">↗️</span>
                        Share
                      </button>
                      <button className="flex items-center hover:text-blue-500">
                        <span className="mr-1">🏆</span>
                        Award
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-full md:w-1/3 lg:w-1/4 md:ml-6 mt-6 md:mt-0">
          <div className="bg-white rounded-md shadow p-4 mb-4">
            <h2 className="font-bold text-lg mb-4">About Truthy</h2>
            <p className="text-gray-700 mb-4">
              Truthy is a platform for verified product reviews. Our mission is to provide authentic feedback from real users.
            </p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Join Truthy
            </button>
          </div>
          
          <div className="bg-white rounded-md shadow p-4 mb-4">
            <h2 className="font-bold text-lg mb-4">Why Verified Reviews Matter</h2>
            <p className="text-gray-700">
              Verified reviews come from users who have actually purchased and used the product. This ensures authenticity and helps you make informed decisions.
            </p>
          </div>
          
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="font-bold text-lg mb-4">Top Products</h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="mr-2 text-blue-500 font-bold">1.</span>
                <span>Sony WH-1000XM5 Headphones</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500 font-bold">2.</span>
                <span>Samsung 55" OLED TV</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500 font-bold">3.</span>
                <span>Ninja Foodi 5-in-1 Air Fryer</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500 font-bold">4.</span>
                <span>Kindle Paperwhite (2024 Edition)</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-blue-500 font-bold">5.</span>
                <span>Dyson V15 Vacuum</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-6 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Truthy - Verified Product Reviews</p>
        </div>
      </footer>
    </div>
  );
};

export default App;