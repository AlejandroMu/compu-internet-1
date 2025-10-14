package model;

import java.util.ArrayList;
import java.util.List;

public class TaskStage {
    private int id;
    private String name;
    private String description;
    private List<Task> tasks;

    public TaskStage(int id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public TaskStage(){

    }

    public List<Task> getTasks() {
        if (tasks == null) {
            tasks = new ArrayList<>();
        }
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    
}
