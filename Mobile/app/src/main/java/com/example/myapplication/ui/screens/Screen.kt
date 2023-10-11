package com.example.myapplication.ui.screens

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Settings
import androidx.compose.ui.graphics.vector.ImageVector


sealed class Screen(val route: String, val label: String, val icon: ImageVector) {
    object Screen1 : Screen("screen1", "Screen 1", Icons.Default.Home)
    object Screen2 : Screen("screen2", "Screen 2", Icons.Default.Favorite)
    object Screen3 : Screen("screen3", "Screen 3", Icons.Default.Settings)
}