package com.example.myapplication.ui.screens.rides

import androidx.compose.foundation.layout.Column
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import com.example.myapplication.ui.components.MyButton
import com.example.myapplication.ui.screens.navigation.CenteredContent


@Composable
fun Ride() {
        Text("RideInfo")
}

@Composable
fun RideList() {
    Column {
            Ride()
            Ride()
            Ride()
        MyButton(onClick = { println("Clicked") },"login")
    }


}
@Composable
fun RideScreen() {
    RideList()
}