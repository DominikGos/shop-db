package com.db.shop.repositories;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class JsonDatabase<T> {
    private ObjectMapper mapper;
    private File file;
    private Class<T[]> type;

    public JsonDatabase(String filename, Class<T[]> type) {

        mapper = new ObjectMapper();

        new File("data").mkdirs();

        this.file = new File("data/" + filename);
        this.type = type;
    }

    public List<T> load() {

        try {

            if (!file.exists()) {
                return new ArrayList<>();
            }

            T[] data = mapper.readValue(file, type);

            return new ArrayList<>(Arrays.asList(data));

        } catch (Exception e) {

            return new ArrayList<>();
        }
    }

    public void save(List<T> data) {

        try {

            mapper.writerWithDefaultPrettyPrinter()
                    .writeValue(file, data);

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}