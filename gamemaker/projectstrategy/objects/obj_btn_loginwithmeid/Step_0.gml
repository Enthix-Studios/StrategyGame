/// @description Insert description here
// You can write your code in this editor
scale_speed = 0.01
scale_max = 0.55
scale_min = 0.5

if collision_point(mouse_x, mouse_y, id, true, false) {
    image_index = 1
    if (image_xscale < scale_max){
        image_xscale += scale_speed
        image_yscale += scale_speed
    }
}
else
{
    image_index = 0
    if (image_xscale > scale_min){
        image_xscale -= scale_speed
        image_yscale -= scale_speed
    }
}