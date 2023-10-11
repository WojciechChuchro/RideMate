package com.example.myapplication.ui.screens.navigation

import android.annotation.SuppressLint
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.BottomNavigation
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.Icon
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.myapplication.ui.screens.Screen
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.myapplication.ui.screens.login.LoginScreen
import com.example.myapplication.data.repository.Repository
import com.example.myapplication.ui.screens.login.LoginViewModel
import com.example.myapplication.ui.screens.mainScreen.MainViewModel
import com.example.myapplication.ui.screens.rides.Ride
import com.example.myapplication.ui.screens.rides.RideList
import com.example.myapplication.ui.screens.rides.RideScreen

@SuppressLint("UnusedMaterialScaffoldPaddingParameter")
@Composable
fun AppNavGraph() {
    val navController = rememberNavController()
    val items = listOf(Screen.Screen1, Screen.Screen2, Screen.Screen3)
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route
    val loginModel = LoginViewModel();

    Scaffold(
        bottomBar = {
            BottomNavigation {
                items.forEach { screen ->
                    BottomNavigationItem(
                        icon = { Icon(screen.icon, contentDescription = null) },
                        label = { Text(screen.label) },
                        selected = currentRoute == screen.route,
                        onClick = {
                            if (currentRoute != screen.route) {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.startDestinationId)
                                    launchSingleTop = true
                                }
                            }
                        }
                    )
                }
            }
        }
    ) {
        NavHost(navController = navController, startDestination = Screen.Screen1.route) {
            //todo
            //!!!
            composable(Screen.Screen1.route) { LoginScreen { username, password ->
                loginModel.LoginAttempt(username,password)
            } }
            composable(Screen.Screen2.route) { Screen2() }
            composable(Screen.Screen3.route) { Screen3() }
        }
    }
}
@Composable
fun Screen1() {
    CenteredContent {
        Text("Ekran Pierwszy")
    }
}

@Composable
fun Screen2() {
    CenteredContent {
        Text("Ekran Drugi")
    }
}

@Composable
fun Screen3() {
    CenteredContent {
        Text("Ekran Trzeci")
    }
}

@Composable
fun CenteredContent(content: @Composable () -> Unit) {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        content()
    }
}