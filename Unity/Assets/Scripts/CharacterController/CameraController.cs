using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour
{

    public Transform target;
    public float smoothSpeed = 0.125f;
    public Vector3 offset;
    public Vector3 currentVelocity = Vector3.zero;

    private bool started;

    void Start() {
        transform.position = target.position + offset;
        started = true;
    }

    void LateUpdate() {
        if(started){
            Vector3 targetPosition = target.position + offset;
            transform.position = Vector3.SmoothDamp(transform.position, targetPosition, ref currentVelocity, smoothSpeed);
            transform.LookAt(target);

        }
        

        //transform.LookAt(target);
    }
}
