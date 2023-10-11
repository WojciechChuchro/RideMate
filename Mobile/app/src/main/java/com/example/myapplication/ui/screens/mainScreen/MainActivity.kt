package com.example.myapplication.ui.screens.mainScreen

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.runtime.*
import com.example.myapplication.ui.screens.navigation.AppNavGraph

class MainActivity : ComponentActivity() {
        val mainVm by viewModels<MainViewModel>()
        @SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
        @OptIn(ExperimentalMaterial3Api::class)
        override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AppNavGraph()
            }
        }
}

