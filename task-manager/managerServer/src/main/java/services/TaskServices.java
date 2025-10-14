package services;

import java.util.List;

import model.Task;
import model.TaskStage;

public class TaskServices {

    public List<TaskStage> getTasks() {
        TaskStage s = new TaskStage();
        s.setId(1);
        s.setName("TO DO");
        s.setDescription("Desc");

        TaskStage s1 = new TaskStage();
        s1.setId(2);
        s1.setName("Doing");
        s1.setDescription("Desc");

        TaskStage s2 = new TaskStage();
        s2.setId(3);
        s2.setName("Done");
        s2.setDescription("Desc");
        Task t = new Task();
        t.setTitle("Task");
        t.setDescription("Descr task");
        s2.getTasks().add(t);

        return List.of(s,s1,s2);
    }
}
