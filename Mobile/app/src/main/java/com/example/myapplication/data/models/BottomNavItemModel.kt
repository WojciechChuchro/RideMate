package com.example.myapplication.data.models

import androidx.compose.ui.graphics.vector.ImageVector

data class BottomNavItemModel(
    val name: String,
    val route: String,
    val icon: ImageVector,
    val badgeCount: Int = 0
)
