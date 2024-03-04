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
import { Button } from "@mui/material";


export default function Nav(props) {

	// uri에 변수를 사용하기 위해 그레이브(`) 사용해야한다
	const api_uri3 = '/login/getCtList';
	const api_uri2 = '/login/getCtList';

	const [courseAr, setCourseAr] = useState([]);
	const [courseTypeAr, setCourseTypeAr] = useState([]);
	const [ar, setAr] = useState([]);


	// const ct_idx = `${props.params.idx}`;
	const router = useRouter();
	const [idx, setValue] = React.useState(0);


	function getCourseTypeList() {
		axios.get(
			api_uri,
		).then(json => {
			setAr(json.data.courseTypeAr);
		});
	};

	function goCtList(idx) {
		router.push('/ctList/' + idx);
	};


	////////////////////////////////


	const handleChange = (event, idx) => {
		setValue(idx);
	};

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
		});
	};

	// 탭 눌렀을때 이동하는 기능
	function goPage(idx) {
		router.push("/ctList/" + idx);
	};


	useEffect(() => {

		getCourseTypeList();
	}, []);


	return (
		<nav>
			<section id="one" className="wrapper style1">
				<header className="major">
					<h2>국비지원취업과정</h2><br />
				</header>
				<div className="container">
					<div className="row">
						<div className="4u">
							<section className="special box">
							<i className="icon fa-refresh major"/>
								<div className="courseTypeList-box">
									<Tabs value={idx} onChange={handleChange} aria-label="nav tabs example" variant="fullWidth" role="navigation" centered>
										{courseTypeAr.map((list) => (
											<Tab key={list.ct_idx} onClick={() => goPage(list.ct_idx)} label={list.ct_name} {...a11yProps(list.ct_idx)} />
										))}
									</Tabs>
								</div>
							</section>
						</div>
						<div className="4u">
							<section className="special box"><i className="icon fa-refresh major"></i>
								<h3>Blandit quis curae</h3>
								<p>Eu non col commodo accumsan ante mi. Commodo consectetur sed mi adipiscing accumsan ac nunc tincidunt lobortis.</p>
							</section>
						</div>
						<div className="4u">
							<section className="special box"><i className="icon fa-cog major"></i>
								<h3>Amet sed accumsan</h3>
								<p>Eu non col commodo accumsan ante mi. Commodo consectetur sed mi adipiscing accumsan ac nunc tincidunt lobortis.</p>
							</section>
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


			<section id="three" className="wrapper style1">
				<div className="container">
					<div className="row">
						<div className="6u">
							<section>
								<h2>캘린더 자리</h2>
								<a href="#" className="image fit"><img src="images/pic03.jpg" alt="logo3" width="818" height="340" /></a>
								<p>Vis accumsan feugiat adipiscing nisl amet adipiscing accumsan blandit accumsan sapien blandit ac amet faucibus aliquet placerat commodo. Interdum ante aliquet commodo accumsan vis phasellus adipiscing. Ornare a in lacinia. Vestibulum accumsan ac metus massa tempor. Accumsan in lacinia ornare massa amet. Ac interdum ac non praesent. Cubilia lacinia interdum massa faucibus blandit nullam. Accumsan phasellus nunc integer. Accumsan euismod nunc adipiscing lacinia erat ut sit. Arcu amet. Id massa aliquet arcu accumsan lorem amet accumsan commodo odio cubilia ac eu interdum placerat placerat arcu commodo lobortis adipiscing semper ornare pellentesque.</p>
							</section>
						</div>
						<div className="6u">
							<section>
								<h2>공지사항</h2>
								<p>Feugiat amet accumsan ante aliquet feugiat accumsan. Ante blandit accumsan eu amet tortor non lorem felis semper. Interdum adipiscing orci feugiat penatibus adipiscing col cubilia lorem ipsum dolor sit amet feugiat consequat.</p>
								<ul className="actions">
									<li><a href="#" className="button alt">Learn More</a></li>
								</ul>
							</section>
						</div>
					</div>
				</div>
			</section>
		</nav>
	);
}
