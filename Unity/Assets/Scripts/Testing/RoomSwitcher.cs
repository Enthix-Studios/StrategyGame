using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class RoomSwitcher : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void RS_ANIMATION(){

         SceneManager.LoadScene("TEST_ANIMATION");
    }

    public void RS_CC(){

         SceneManager.LoadScene("TEST_CC");
    }
}
