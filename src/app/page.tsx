"use client";
import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bill from '@/components/Bill/Bill';
import Pos from '@/components/Pos/Pos';


function Home() {
  return (
		<Router>    <Routes>
      <Route path="/" element={<Pos/>} />
      <Route path="bill" element={<Bill/>} />
    </Routes>
		</Router>

  );
}

export default Home;