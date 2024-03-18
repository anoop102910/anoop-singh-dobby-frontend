import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useQueryContext } from "../../context/QueryContext";

function Navbar() {

  const {user} =  useAuthContext();
  const {query,updateQuery} = useQueryContext();

  return (
    <>
          <header className="sticky z-[1000] top-0 left-0 w-full gap-4 h-16 rounded-md shadow-md bg-white flex items-center px-6 justify-between">
            <div className="sm:w-[35vw] w-[55vw]   rounded-md  flex gap-4 px-4 items-center bg-slate-100 py-2">
              <i>
                <img src="/navbar/search.svg" alt="search" />
              </i>
              <input
                className=" bg-inherit outline-none w-full text-slate-700 "
                placeholder="Search..."
                type="search"
                value={query}
                onChange={e=>updateQuery(e.target.value)}
              />
            </div>

            <div className="max-w-[230px] flex gap-10 justify-between items-center rounded-lg bg-white border border-slate-200 px-2 py-1 ">
              <div className="flex  items-center gap-4">
                <img src="avatar.png" alt="avatar" />
                <div className="flex flex-col max-sm:hidden ">
                  <span className="text-xs">Welcome back</span>
                  <span className="text-sm">{user.username}</span>
                </div>
              </div>
              <div>
                <i>
                  <img className="max-sm:hidden" src="back.svg" alt="" />
                </i>
              </div>
            </div>
          </header>
    </>
  );
}

export default Navbar;
