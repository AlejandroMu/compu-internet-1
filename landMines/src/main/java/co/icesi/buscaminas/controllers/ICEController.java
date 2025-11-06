package co.icesi.buscaminas.controllers;

import com.zeroc.Ice.Communicator;
import com.zeroc.Ice.ObjectAdapter;
import com.zeroc.Ice.Util;

import co.icesi.buscaminas.services.ServiceIceImpl;
import co.icesi.buscaminas.services.ServicesImpl;

public class ICEController {



    public void init(ServicesImpl servicesImpl, String[] configs){
        Communicator communicator = Util.initialize(configs);

        ServiceIceImpl service = new ServiceIceImpl(servicesImpl);

        ObjectAdapter adapter = communicator.createObjectAdapterWithEndpoints("IceService", "ws -h localhost -p 9099");

        adapter.add(service, Util.stringToIdentity("Service"));

        adapter.activate();

        communicator.waitForShutdown();

    }
    
}
