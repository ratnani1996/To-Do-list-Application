var something=function()
{
    alert("You have clicked");
};

//var activity-----OBJECT
//var Activity-----ARRAY
//var todo---------LOCAL STORAGE KEY

//globally declared object to store activity

//draw the list element on the screen

var draw_elements=function()
{
    
    var Activity=new Array();
    Activity=JSON.parse(localStorage.getItem('todo'));
    $(".todo").empty();             //delete the entire data in todo list to remove retundancy
    if(localStorage.getItem('todo')===null)
        {
            //this will do nothing
        }
    else
        {
            for(var i=Activity.length-1;i>=0;i--)  //draw tasks which are first false
                {
            if(Activity[i].completion==false)
                {
                    $(".todo").append(
                        '<li>'+
                            '<p>'+Activity[i].task+'</p>'+
                            '<div class="buttons">'+
                                '<button type="button" class="btn btn-default done"><img src="done_icon.svg"></button>'+
                                '<button type="button" class="btn btn-default delete"><img src="remove_icon.svg"></button>'+
                            '</div>'+
                        '</li>'
                    );
                }
        }
            $(".todo").append('<hr>')
            for(var i=0;i<Activity.length;i++)  //draw tasks which are true now
                {
            if(Activity[i].completion==true)
                {
                    $(".todo").append(
                        '<li>'+
                            '<p class="striked">'+Activity[i].task+'</p>'+
                            '<div class="buttons">'+
                                '<button type="button" class="btn btn-default delete"><img src="remove_icon.svg"></button>'+
                            '</div>'+
                        '</li>'
                    );
                    
                }
        }
        }
    
    
}

//add the task to local storage
var add_activity=function()
{
    var act=document.getElementsByName('activity')[0].value;
    if(act==="")
        {
            alert("Enter an activity");
        }
    else
        {
            var complete=false;
            var activity={task:act,completion:complete};
            //if there is no item in the localstrorage
            if(localStorage.getItem('todo')===null)
                {
                    var Activity=new Array();
                    Activity.push(activity);
                    localStorage.setItem('todo',JSON.stringify(Activity));

                }
            else    //if there are some items in the local storage
                {
                    var Activity=new Array();
                    Activity=JSON.parse(localStorage.getItem('todo'));  //get the data from the local strorage
                    Activity.push(activity);    //add the new data to local strorage
                    localStorage.setItem('todo',JSON.stringify(Activity));  //again add the content back to local storage,hence it is updated

                }
        }
    
    draw_elements();
    var form=$("#collect-data")[0];
    form.reset();
};

//function for a completed activity
var done_activity=function(act)
{
    var Activity=new Array();
    Activity=JSON.parse(localStorage.getItem('todo'));
    for(var i=0;i<Activity.length;i++)
        {
            if(Activity[i].task===act)
                {
                    Activity[i].completion=true;        
                }
            
        }
    localStorage.setItem('todo',JSON.stringify(Activity));
    draw_elements();
};

var delete_activity=function(act)
{
    var permission=confirm("Are you sure you want to delete "+act);
    if(permission)
        {
            //get the data from local storage and store it in the array Activity
            var Activity=new Array();
            Activity=JSON.parse(localStorage.getItem('todo'));
            for(var i=0;i<Activity.length;i++)
                {
                    if(Activity[i].task===act)
                        {
                            Activity.splice(i,1);   //delete the item from the array
                        }
                }
            localStorage.setItem('todo',JSON.stringify(Activity));  //add back the elements to local storage
            draw_elements();    //draw elements at the end
        }
    else
        {
            //do nothing
        }
    
        
}
//program flow starts from here
$(document).ready(function(){
    draw_elements();
    $("#add-activity").on('click',add_activity);    //clicked on plus button to add activity
    $(".todo").on('click','.done',function(){
        done_activity($(this).parent().parent().find('p').text());
    });   //clicked  on done button to check the activity done
    $(".todo").on('click','.delete',function(){
        delete_activity($(this).parent().parent().find('p').text());
    }); //clicked on delete button to delte the activity
    
});