"use client"

import '../css/style.css'
import '../css/skel.css'
import '../css/style-xlarge.css'
import Blank from './Blank';

import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import { Button, Card, CardActionArea, CardContent, CardMedia, Divider, Icon, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


export default function Nav(props) {

	// uri에 변수를 사용하기 위해 그레이브(`) 사용해야한다
	const api_uri2 = '/login/getCtList';
	// const api_uri = `/login/ctList?ct_idx=${props.params.idx}`; 
	// const ct_idx = `${props.params.idx}`;

	//캘린더 
	const [calendar, setCalendar] = useState([]);
	const api_uri4 = '/list';

	const [courseAr, setCourseAr] = useState([]);
	const [courseTypeAr, setCourseTypeAr] = useState([]);
	const [ar, setAr] = useState([]);


	const router = useRouter();
	const [idx, setValue] = React.useState(0);

	const handleChange = (event, idx) => {
		setValue(idx);
	};

	function getCourseTypeList() {
		axios.get(
			api_uri,
		).then(json => {
			console.log(json.data.courseTypeAr);
			setAr(json.data.courseTypeAr);
		});
	};

	// 해당 과정에 속하는 과목 목록 가져오는 기능
	function getList() {
		axios.get(
			api_uri,
		).then((json) => {
			setCourseAr(json.data.courseAr);
		});
	};

	function goCtList(idx) {
		router.push('/ctList/' + idx);
	};


	////////////////////////////////



	function CustomTabPanel(props) {
		const { children, idx, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={idx !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{idx === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	};

	CustomTabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
	};

	function a11yProps(index) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	};


	// 위에 탭 넣기위해 교육과정 목록 가져오는 기능
	function getCourseTypeList() {
		axios.get(
			api_uri2,
		).then(json => {
			setCourseTypeAr(json.data.courseTypeAr);
			console.log(json.data.courseTypeAr);
		});
	};

	// 탭 눌렀을때 이동하는 기능
	function goPage(idx, index) {
		router.push("/ctList/" + idx + "/" + index);
	};

	function getData3() {
		axios.get(
			api_uri4
		).then((json) => {
			console.log(json.data);
			setCalendar(json.data)
		});
	}


	useEffect(() => {
		getCourseTypeList();
		getData3();
		// getList();
	}, []);



	return (
		<nav>
			<section id="one" className="wrapper style1">
				<header className="major">
					<h2>국비지원취업과정</h2><br />
				</header>
				<div className="container">
					<div className="row">
						<div className="12u">
							<div className="courseTypeList-box">

								{/* 교육과정이 없을때 여기를 수행 */}
								{courseTypeAr.map((list,index) => (
									<div style={{ display: 'inline-block', width: '300px', margin: 'auto' }} >
										{
											list.cvo === null
												?
												<Stack direction="row" >
													<Box>
														<Link key={list.ct_idx} onClick={() => goCtList(list.ct_idx)}  {...a11yProps(list.ct_idx)} style={{ textDecoration: "none" }}>
															<Card sx={{ width: 280, marginTop: '10px' }}>
																<CardActionArea>
																	{/* 이미지 */}
																	<CardMedia
																		component="img"
																		height="140"
																		image="../images/ict_logo.png"
																		alt="green iguana"
																	/>

																	<CardContent>
																		<Typography gutterBottom variant="h5" component="div" value={idx} >
																			교육과정이 없습니다
																		</Typography>
																		<Typography variant="body2" color="text.secondary">
																			교육기간 : 준비중 <br />
																			교육요일 : 준비중
																		</Typography>
																	</CardContent>
																</CardActionArea>
															</Card>
														</Link>
													</Box>
												</Stack>

												:

												<Stack direction="row" >
													<Box>
														<Link key={list.ct_idx} onClick={() => goPage(list.ct_idx)} {...a11yProps(list.ct_idx)} style={{ textDecoration: "none" }}>
															<Card sx={{ width: 280, marginTop: '5px' }}>
																<CardActionArea>
																	{/* 이미지 */}
																	<CardMedia
																		component="img"
																		height="140"
																		image="../images/nav1.png"
																		alt="green iguana"
																	/>

																	<CardContent>
																		<Typography gutterBottom variant="h5" component="div" value={idx}  >
																			{list.cvo.c_name}
																		</Typography>
																		<Typography variant="body2" color="text.secondary">
																			교육기간 : {list.cvo.start_date}~{list.cvo.end_date}<br />
																			교육요일 : {list.cvo.c_day}
																		</Typography>
																	</CardContent>
																</CardActionArea>
															</Card>
														</Link>
													</Box>
												</Stack>
										}
									</div>
								))}
							</div>

						</div>
					</div>
				</div>
			</section>


			<section id="two" className="wrapper style2">
				<header className="major">
					<h2 style={{ color: '#787878' }}>완벽취업성공 프로그램</h2><br />
				</header>
				<div className="container">
					<div className="row" >
						<div className="12u" >
							<section className="special ">
								<img src="../images/main-banner1.jpg" alt="logo" width="100%" height="500px"></img>
								<Blank />
								<p style={{ color: '#787878' }}>한국아이씨티기술협회 부설 한국ICT인재개발원에서는 수료 전부터 1:1 기업 취업연계 매칭으로 완벽 취업성공시스템을 진행합니다.<br />
									여러분은 취업에 대한 열정만 가지고 있으면 됩니다. 나머지 준비는 한국ICT인재개발원에서 모든 것을 준비합니다.<br />
									성공취업！ 그리고 취업 후에도 늘 여러분과 함께합니다.</p>
							</section>
						</div>
					</div>
				</div>
			</section>

			{/* 캘린더 */}
			<section id="three" className="wrapper style1">
				<div className="container">
					<div className="row">
						<div className="6u">
							<section>
								<FullCalendar
									defaultView="dayGridMonth"
									plugins={[dayGridPlugin]}
									events={calendar}
									dayMaxEventRows={true}
								// eventSources={[
								// 	googlecalender
								// ]}
								/>
							</section>
						</div>
						{/* 취업현황 게시판 */}
						<div className="6u">
							<section>
								<h2>취업 현황</h2>
								<TableContainer component={Paper}>
									<Table aria-label="qna table">
										<TableBody>
											<TableRow
												sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
											>
												{/* <TableCell component="th" scope="row"></TableCell> */}
												<TableCell align="left" ><i className="icon fa-heart"></i>&nbsp;이름</TableCell>
												<TableCell align="center">212313</TableCell>
												<TableCell align="right">2020-02-21</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</section>
						</div>
					</div>
				</div>
			</section>
		</nav>
	);
}
