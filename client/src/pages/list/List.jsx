
      import "./list.css";
      import Navbar from "../../components/navbar/Navbar";
      import Header from "../../components/header/Header";
      import { useLocation } from "react-router-dom";
      import { useState } from "react";
      import { format } from "date-fns";
      import { DateRange } from "react-date-range";
      import SearchItem from "../../components/searchItem/SearchItem";
      import useFetch from "../../hooks/useFetch";
      import { useContext } from "react";
      import { SearchContext } from "../../context/SearchContext";


      const List = () => {
        const location = useLocation();
        const [destination, setDestination] = useState(location.state.destination);
        const [dates, setDates] = useState(location.state.dates);
        const [openDate, setOpenDate] = useState(false);
        const [options, setOptions] = useState(location.state.options);
        const [min, setMin] = useState(undefined);
        const [max, setMax] = useState(undefined);
      
        const API_BASE_URL = process.env.REACT_APP_PROXY; // Common entry point


        const { dispatch } = useContext(SearchContext);

        const { data, loading, error,reFetch } = useFetch(
          `${API_BASE_URL}/hotels?city=${destination}&min=${min || -1 }&max=${max || 99999}`);

        const handleClick = () => {
          dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
          console.log(destination)
          reFetch();
        };

 
 

        return (
          <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
              <div className="listWrapper">
                <div className="listSearch">
                  <h1 className="lsTitle">Search</h1>
                  <div className="lsItem">
                    <label>Destination</label>
                    <input placeholder={destination} type="text" 
                     onChange={(e) => setDestination(e.target.value)}/>
                  </div>
                  <div className="lsItem">
                    <label>Check-in Date</label>
                    <span onClick={() => setOpenDate(!openDate)}>{`${format(
                      dates[0].startDate,
                      "MM/dd/yyyy"
                    )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                    {openDate && (
                      <DateRange
                        onChange={(item) => setDates([item.selection])}
                        minDate={new Date()}
                        ranges={dates}
                      />
                    )}
                  </div>
                  <div className="lsItem">
                    <label>Options</label>
                    <div className="lsOptions">
                      <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Min price <small>per night</small>
                        </span>
                        <input
                          type="number"
                          onChange={(e) => setMin(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Max price <small>per night</small>
                        </span>
                        <input
                          type="number"
                          onChange={(e) => setMax(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Adult</span>
                        <input
                          type="number"
                          min={1}
                          className="lsOptionInput"
                          placeholder={options.adult}
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Children</span>
                        <input
                          type="number"
                          min={0}
                          className="lsOptionInput"
                          placeholder={options.children}
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Room</span>
                        <input
                          type="number"
                          min={1}
                          className="lsOptionInput"
                          placeholder={options.room}
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleClick}>Search</button>
                </div>
                <div className="listResult">
                  {loading ? (
                    "loading"
                  ) : (
                    <>
                      {data.map((item) => (
                        <SearchItem item={item} key={item._id} />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      };
      
      export default List;