
// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import { OrgChart } from 'd3-org-chart'; // Import OrgChart directly
// // import { API_ORGCHART_GET } from '../../utils/constants/Config';

// const OrganizationStructure = () => {
//     const [division, setDivision] = useState("");
//     const [isLoading, setLoading] = useState(true); // State to track loading

//     const chartContainerRef = useRef(null);
//     const chart = useRef(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true); // Start loading indicator

//             try {
//                 // const response = await d3.csv(`${API_ORGCHART_GET}${division}`);
//                 // const response = await d3.csv(`http://103.235.71.9:8080/api/organization_structure_view/?Division=`);
//                 const response = await d3.csv(`http://127.0.0.1:8000/api/organization_structure_view/?Division=`);
             
//                 const data = response.map(d => ({
//                     ...d,
//                     image: d.image || 'https://via.placeholder.com/50', // Use a placeholder image
//                     fullName: `${d.name} ${d.lastName}`
//                 }));
//                 // console.log('Processed data:', data);
//                 // Destroy the existing chart instance if it exists
//                 if (chart.current) {
//                     chart.current.destroy();
//                 }

//                 // Ensure the container exists before initializing the chart
//                 if (chartContainerRef.current) {
//                     // Initialize chart
//                     chart.current = new OrgChart()
//                         .compact(false)
//                         .pagingStep((d) => 5)
//                         .minPagingVisibleNodes((d) => 5)
//                         .pagingButton((d, i, arr, state) => {
//                             const step = state.pagingStep(d.parent);
//                             const currentIndex = d.parent.data._pagingStep;
//                             const diff = d.parent.data._directSubordinatesPaging - currentIndex;
//                             const min = Math.min(diff, step);
//                             return `
//                                 <div style="margin-top:50px;">
//                                     <div style="display:flex;width:170px;border-radius:20px;padding:5px 15px; padding-bottom:4px;background-color:#E5E9F2">
//                                         <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM16 6H18V18H16V6Z" fill="#716E7B" stroke="#716E7B"/>
//                                         </svg></div>
//                                         <div style="line-height:2 "> Show next ${min} nodes </div>
//                                     </div>
//                                 </div>
//                             `;
//                         })
//                         .nodeHeight((d) => 150)
//                         .nodeWidth((d) => 250)
//                         .childrenMargin((d) => 50)
//                         .compactMarginBetween((d) => 35)
//                         .compactMarginPair((d) => 30)
//                         .neighbourMargin((a, b) => 20)
//                         .nodeContent((d, i, arr, state) => {
//                             const color = '#e3cfdd';
//                             const imageDiffVert = 25 + 2;
//                             return `
//                                 <div style='width:${d.width}px;height:${d.height}px;padding-top:${imageDiffVert - 5}px;padding-left:1px;padding-right:1px'>
//                                     <div style="font-family: 'Inter', sans-serif;background-color:${color};margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border:${d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396' : '1px solid #E4E2E9'}">
//                                         <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px"></div>
//                                         <div style="background-color:${"color"};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;"></div>
//                                         <div style="background-color:#; display: flex; align-items: center; padding: 10px; ">
//                                             <img src="${d.data.image}" style="border-radius:100px;width:40px;height:40px;" />
//                                             <div style="margin-left: 5px;">
//                                                 <div style="font-size:18px;color:#08011E;font-weight:bold;overflow:hidden;text-overflow:ellipsis;" title="NAME : ${d.data.name} ${d.data.lastName}">${d.data.name} ${d.data.lastName}</div>
//                                                 <div style="color:black;font-size:14px; " title="POSITION : ${d.data.position} ">${d.data.position}</div>
//                                             <div style="color:black;font-size:14px;" title="EMAIL : ${d.data.email}">
//                                                 ${d.data.email.substring(0, 25)}${d.data.email.length > 25 ? '...' : ''}
//                                             </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             `;
//                         })
//                         .container(chartContainerRef.current)
//                         .data(data)
//                         .render();
//                 }

//                 setLoading(false); // Stop loading indicator
//             } catch (error) {
//                 console.error('Error loading data:', error);
//                 setLoading(false); // Stop loading indicator on error
//             }
//         };

//         fetchData();

//         // Clean up function
//         return () => {
//             if (chart.current && chart.current.destroy) {
//                 chart.current.destroy(); // Ensure OrgChart has a destroy method before calling it
//             }
//         };
//     }, [division]); // Watch for changes in division

//     const handleDivisionSelect = (selectedDivision) => {
//         setDivision(selectedDivision);
//     };

//     return (
//         <>
//           <div>
//                  {/* <div className="dropdown">
//                     <button className="btn btn-secondary dropdown-toggle px-5" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                         {division ? division : 'Division'}
//                     </button>
//                     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
//                         <li><a className="dropdown-item" onClick={() => handleDivisionSelect('ACIL')}>ACIL</a></li>
//                         <li><a className="dropdown-item" onClick={() => handleDivisionSelect('Epiroc')}>Epiroc</a></li>
//                         <li><a className="dropdown-item" onClick={() => handleDivisionSelect('LNT')}>LNT</a></li>
//                         <li><a className="dropdown-item" onClick={() => handleDivisionSelect('MJ')}>MJ</a></li>
//                         <li><a className="dropdown-item" onClick={() => handleDivisionSelect('OM')}>OM</a></li>
//                         <li><a className="dropdown-item" onClick={() => handleDivisionSelect('shell')}>Shell</a></li>
//                     </ul>
//                 </div>  */}
//             </div>
//             {isLoading ? (
//                 <div className="d-flex justify-content-center mt-5 align-content-center">
//                     <div className="spinner-border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="chart-container" ref={chartContainerRef}></div>
//             )}
//         </>
//     );
// };

// export default OrganizationStructure;






import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart'; // Import OrgChart directly

const OrganizationStructure = () => {
    const [isLoading, setLoading] = useState(true); // State to track loading
    const chartContainerRef = useRef(null);
    const chart = useRef(null);

    const dummyData = [
        { id: 96, parentId: "", name: "Seshadri", lastName: "Sekhar Neti", position: "Director", email: "nethisekhar@gmail.com", image: "" },
        { id: 3, parentId: 96, name: "Gampa", lastName: "Sudhakar", position: "Business Head", email: "Mithra.Mktg@Gmail.Com", image: "" },
        { id: 1, parentId: 3, name: "Majji", lastName: "Suresh", position: "Service Manager", email: "Service.Mithra@Gmail.Com", image: "" },
        { id: 11, parentId: 1, name: "Gandhavalla", lastName: "Srinivasulu", position: "Senior Service Engineer", email: "Gandhavalla1981@Gmail.Com", image: "" },
        { id: 14, parentId: 1, name: "Gubbala", lastName: "Syamalarao", position: "Senior Service Engineer", email: "Syamgubbala99@Gmail.Com", image: "" },
        { id: 18, parentId: 1, name: "Kosuru", lastName: "Saitejaswi", position: "Store Assistant", email: "Saitejaswi.Kosuru1994@Gmail.Com", image: "" },
        { id: 24, parentId: 1, name: "Velicharla", lastName: "Naresh", position: "Senior Service Engineer", email: "Velicharlanaresh143@Gmail.Com", image: "" },
        { id: 30, parentId: 1, name: "Kalapakuri", lastName: "Vamsi Krishna", position: "Senior Service Engineer", email: "Kalapakurivamssy@Gmail.Com", image: "" },
        { id: 2, parentId: 3, name: "Gulimi", lastName: "Apparao", position: "Assistant Service Manager", email: "Mithra.Vizag@Gmail.Com", image: "" },
        { id: 8, parentId: 2, name: "Pothina", lastName: "Santosh Kumar", position: "Senior Service Engineer", email: "Mithra.Vizag@Gmail.Com", image: "" },
        { id: 12, parentId: 2, name: "Dadi", lastName: "Srinu", position: "Senior Service Engineer", email: "Dadisrinu006@Gmail.Com", image: "" },
        { id: 15, parentId: 2, name: "Maradana", lastName: "Jogi Naidu", position: "Senior Service Engineer", email: "Mithra.Vizag@Gmail.Com", image: "" },
        { id: 16, parentId: 2, name: "Pachiripalli", lastName: "Ravi", position: "Senior Service Engineer", email: "Raviravi3273@Gmail.Com", image: "" },
        { id: 4, parentId: 3, name: "Polaki", lastName: "Shankar Rao", position: "Sales Manager", email: "Pshankar.Sales@Gmail.Com", image: "" },
        { id: 5, parentId: 3, name: "Shaik", lastName: "Uzmi", position: "Store Assistant", email: "Parts.Mithra@Gmail.Com", image: "" },
        { id: 6, parentId: 3, name: "Butta", lastName: "Shyamala", position: "Customer Support Officer", email: "Mithra.Mktg@Gmail.Com", image: "" },
        { id: 9, parentId: 3, name: "Mohammed", lastName: "Abid", position: "Store Support Staff", email: "mabed0239@gmail.com", image: "" },
        { id: 13, parentId: 3, name: "Bhagavathula", lastName: "Naga Srinivasarao", position: "Senior Sales Executive", email: "bnsrao1973@gmail.com", image: "" },
        { id: 21, parentId: 3, name: "Chappa", lastName: "Manibabu", position: "Sales Manager", email: "Manibabu80@Gmail.Com", image: "" },
        { id: 23, parentId: 3, name: "Yanamala", lastName: "Veera Mohan", position: "Senior Service Engineer", email: "Service.Mithra@Gmail.Com", image: "" },
        { id: 29, parentId: 3, name: "Shaik", lastName: "Sai Baba", position: "Assistant Service Manager", email: "Service.Mithra@Gmail.Com", image: "" },
        { id: 7, parentId: 29, name: "Kanike", lastName: "Nagesh", position: "Senior Service Engineer", email: "Kanikenagesh123@Gmail.Com", image: "" },
        { id: 10, parentId: 29, name: "Samali", lastName: "Ambadas", position: "Senior Service Engineer", email: "sandydas070@gmail.com", image: "" },
        { id: 17, parentId: 29, name: "Jameel", lastName: "Mohummed", position: "Senior Service Engineer", email: "Jameeljakeer786@Gmail.Com", image: "" },
        { id: 19, parentId: 29, name: "Chetanvarma", lastName: "Sakineti", position: "Senior Service Engineer", email: "Sakinetichetanvarma@gmail.com", image: "" },
        { id: 25, parentId: 29, name: "Jangili", lastName: "Anvesh", position: "Senior Service Engineer", email: "Navayuga9494@Gmail.Com", image: "" },
        { id: 27, parentId: 29, name: "Valiveti", lastName: "Ramesh", position: "Senior Service Engineer", email: "ramesh.v255@gmail.com", image: "" },
        { id: 28, parentId: 29, name: "Jaheer", lastName: "Pasha", position: "Senior Service Engineer", email: "Jaheerpasha2347@Gmail.Com", image: "" }
    ];

    useEffect(() => {
        setLoading(true); // Start loading indicator

        const data = dummyData.map(d => ({
            ...d,
            image: d.image || 'https://via.placeholder.com/50', // Use a placeholder image
            fullName: `${d.name} ${d.lastName}`
        }));

        // Destroy the existing chart instance if it exists
        if (chart.current) {
            chart.current.destroy();
        }

        // Ensure the container exists before initializing the chart
        if (chartContainerRef.current) {
            // Initialize chart
            chart.current = new OrgChart()
                .compact(false)
                .pagingStep((d) => 5)
                .minPagingVisibleNodes((d) => 5)
                .pagingButton((d, i, arr, state) => {
                    const step = state.pagingStep(d.parent);
                    const currentIndex = d.parent.data._pagingStep;
                    const diff = d.parent.data._directSubordinatesPaging - currentIndex;
                    const min = Math.min(diff, step);
                    return `
                        <div style="margin-top:50px;">
                            <div style="display:flex;width:170px;border-radius:20px;padding:5px 15px; padding-bottom:4px;background-color:#E5E9F2">
                                <div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM16 6H18V18H16V6Z" fill="#716E7B" stroke="#716E7B"/>
                                </svg></div>
                                <div style="line-height:2 "> Show next ${min} nodes </div>
                            </div>
                        </div>
                    `;
                })
                .nodeHeight((d) => 150)
                .nodeWidth((d) => 250)
                .childrenMargin((d) => 50)
                .compactMarginBetween((d) => 35)
                .compactMarginPair((d) => 30)
                .neighbourMargin((a, b) => 20)
                .nodeContent((d, i, arr, state) => {
                    const color = '#e3cfdd';
                    const imageDiffVert = 25 + 2;
                    return `
                        <div style='width:${d.width}px;height:${d.height}px;padding-top:${imageDiffVert - 5}px;padding-left:1px;padding-right:1px'>
                            <div style="font-family: 'Inter', sans-serif;background-color:${color};margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border:${d.data._highlighted || d.data._upToTheRootHighlighted ? '5px solid #E27396' : '1px solid #E4E2E9'}">
                                <div style="display:flex;justify-content:flex-end;margin-top:5px;margin-right:8px"></div>
                                <div style="background-color:${"color"};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;"></div>
                                <div style="background-color:#; display: flex; align-items: center; padding: 10px; ">
                                    <img src="${d.data.image}" style="border-radius:100px;width:40px;height:40px;" />
                                    <div style="margin-left: 5px;">
                                        <div style="font-size:18px;color:#08011E;font-weight:bold;overflow:hidden;text-overflow:ellipsis;" title="NAME : ${d.data.name} ${d.data.lastName}">${d.data.name} ${d.data.lastName}</div>
                                        <div style="color:black;font-size:14px; " title="POSITION : ${d.data.position} ">${d.data.position}</div>
                                    <div style="color:black;font-size:14px;" title="EMAIL : ${d.data.email}">
                                        ${d.data.email.substring(0, 25)}${d.data.email.length > 25 ? '...' : ''}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                })
                .container(chartContainerRef.current)
                .data(data)
                .render();
        }

        setLoading(false); // Stop loading indicator

        // Clean up function
        return () => {
            if (chart.current && chart.current.destroy) {
                chart.current.destroy(); // Ensure OrgChart has a destroy method before calling it
            }
        };
    }, [dummyData]); // Empty dependency array to run only once

    return (
        <>
            {isLoading ? (
                <div className="d-flex justify-content-center mt-5 align-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="chart-container" 
                ref={chartContainerRef} 
                >j</div>
            )}
         
        </>
    );
};

export default OrganizationStructure;


