import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Administration from '../administration'
import AnalyseJob from '../analyseJob'
import JobTable from '../jobTable'
import MasterPlan from '../masterPlan'
import MonthPlan from '../monthPlan'
import NationalPolicy from '../nationalPolicy'
import ProvincialAnalyse from '../provincialAnalyse'
import ProvincialPolicy from '../provincialPolicy'
import ProvincialTable from '../provincialTable'
import './index.css'

export default function Content() {
    return (
        <div className="content-container">
            <Routes>
                <Route path="/" element={<Navigate replace to="/policy/national"/>}/>
                <Route path='/national/policy' element={<NationalPolicy/>}/>
                <Route path='/provincial/policy' element={<ProvincialPolicy/>}/>
                <Route path="/national/jobs" element={<JobTable/>}/>
                <Route path="/national/analyse" element={<AnalyseJob/>}/>
                <Route path="/provincial/jobs" element={<ProvincialTable/>}/>
                <Route path="policy/administration" element={<Administration/>}/>
                <Route path="/provincial/analyse" element={<ProvincialAnalyse/>}/>
                <Route path="/plan/master" element={<MasterPlan/>}/>
                <Route path="/plan/daily" element={<MonthPlan/>}/>
            </Routes>
        </div>
    )
}