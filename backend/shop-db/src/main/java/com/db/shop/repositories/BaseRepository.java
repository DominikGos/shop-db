package com.db.shop.repositories;

import java.util.List;
import java.util.Optional;
import com.db.shop.models.BaseModel;

public abstract class BaseRepository<T extends BaseModel> {

    protected JsonDatabase<T> db;
    protected List<T> items;

    public BaseRepository(
            String filename,
            Class<T[]> type
    ) {

        this.db = new JsonDatabase<>(filename, type);
        this.items = db.load();
    }

    // CREATE
    public T add(T item) {

        items.add(item);

        db.save(items);

        return item;
    }

    // READ ALL
    public List<T> getAll() {
        return items;
    }

    // READ BY ID
    public Optional<T> getById(String id) {

        return items.stream()
                .filter(i -> i.getId().equals(id))
                .findFirst();
    }

    // UPDATE
    public void update(T updatedItem) {

        for (int i = 0; i < items.size(); i++) {

            if (items.get(i).getId()
                    .equals(updatedItem.getId())) {

                items.set(i, updatedItem);

                db.save(items);

                return;
            }
        }
    }

    // DELETE
    public void delete(String id) {

        items.removeIf(i ->
                i.getId().equals(id));

        db.save(items);
    }
}