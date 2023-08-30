import { useState, useEffect } from "react"
import LoadingState from "../components/LoadingState"

export default function Capsules() {

  const [capsules, setCapsules] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [originalLaunchFilter, setOriginalLaunchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchCapsules = async () => {
      let apiUrl = "https://api.spacexdata.com/v4/capsules";
  
      // Add filter parameters based on selected filters
      if (statusFilter) {
        apiUrl += `?status=${statusFilter}`;
      }
      if (originalLaunchFilter) {
        apiUrl += `&original_launch=${originalLaunchFilter}`;
      }
      if (typeFilter) {
        apiUrl += `&type=${typeFilter}`;
      }
  
      const res = await fetch(apiUrl);
      const data = await res.json();
      setCapsules(data);
    };
  
    fetchCapsules();
  }, [statusFilter, originalLaunchFilter, typeFilter]);
  

  return (
    <>
      {!capsules ? (
        <LoadingState />
      ) : (
        <section className="pages-showcase">
          <div className="overlay py-20 lg:pt-32">
          <div className=''>
          <div className="search-form mt-4 ml-5">
  <label htmlFor="statusFilter" className="block text-white">
    Status:
  </label>
  <select
    id="statusFilter"
    className="block w-[90px] mt-1 p-2 border rounded-md"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">All</option>
    <option value="active">Active</option>
    <option value="retired">Retired</option>
    {/* Add more options as needed */}
  </select>

  <label htmlFor="originalLaunchFilter" className="block text-white mt-4">
    Original Launch:
  </label>
  {/* Add input field for original_launch filter (e.g., date input) */}

  <label htmlFor="typeFilter" className="block text-white mt-4">
    Type:
  </label>
  <input
    id="typeFilter"
    type="text"
    className="block w-[400px] mt-1 p-2 border rounded-md"
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
  />
</div>

          </div>
            <h1 className="heading">Capsules</h1>

            <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
              {capsules.map(
                ({
                  reuse_count,
                  water_landings,
                  land_landings,
                  last_update,
                  launches,
                  serial,
                  status,
                  type,
                  id,
                }) => (
                  <article key={id} className="articles p-5">
                    <h2 className="text-white font-bold text-xl">
                      {type},{" "}
                      <span className="opacity-75 text-lg font-normal">
                        {serial}
                      </span>
                    </h2>
                    <ul className="text-sm opacity-75 text-white mt-3">
                      <li>Reused {reuse_count} times</li>
                      <li>{launches.length} launches</li>
                      <li>{water_landings} water landings</li>
                      <li>{land_landings} land landings</li>
                      <li
                        className={`capitalize ${
                          status === "active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        Status: {status}
                      </li>
                    </ul>
                    <p className="text-white text-sm opacity-75 mt-3">
                      {last_update}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
