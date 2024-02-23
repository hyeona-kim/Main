"use client"
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function staffList() {
    const [ar, setAr] = useState([]);
    const api_uri = '/login/getSfList';

    function getStaffList() {
        axios.get(
            api_uri,
        ).then(json => {
            setAr(json.data.ar);
        });
    };

    useEffect(() => {
        getStaffList();
    },[]);
    
    return (
        <>
        <div>
            <TableContainer>
                <Table className="staffList-table">
                    <TableBody>
                        {ar.map((list) => (
                            <TableRow key={list.sf_idx}>
                                <TableCell>{list.sf_name}</TableCell>
                                <TableCell>{list.sf_email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </>
    );
}