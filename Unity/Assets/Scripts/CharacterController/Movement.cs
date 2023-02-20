using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class Movement : MonoBehaviour
{
    public float speed = 10.0F;
    public float sprintSpeed = 6.0f;

    public Rigidbody rb;

    // Start is called before the first frame update
    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        rb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {

        // Edit -> Project settings -> Input manager -> Axes
        // daar vind je de axis die standaard in unity staat, heel handig :)

        float translation = Input.GetAxis("Vertical") * speed;
        float straffe = Input.GetAxis("Horizontal") * speed;


        translation *= Time.deltaTime;
        straffe *= Time.deltaTime;



        transform.Translate(straffe, 0, translation);

        if (Input.GetKeyDown("left shift"))
        {
            speed = speed + sprintSpeed;
        }
        if (Input.GetKeyUp("left shift"))
        {
            speed = speed - sprintSpeed;
        }



        if (Input.GetKeyDown("escape"))
        {
            Cursor.lockState = CursorLockMode.None;
        }
        if (Input.GetMouseButtonDown(0))
        {
            Cursor.lockState = CursorLockMode.Locked;
        }

    }

}
