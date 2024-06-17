<div class="container mx-auto mb-3">
    <form id="addNotebookForm">
        <div class="row mb-3 g-3">
            <div class="form-floating col-sm mw-50">
                <input class="form-control" type="text" id="title" name="title" placeholder="notebook title">
                <label for="title">Notebook Title</label>
                <input type="number" class="visually-hidden" value="${sessionScope.userId}" id="addNotebookUser">
                <label class="visually-hidden" for="addNotebookUser"></label>
            </div>
        </div>
        <div class="row g-3">
        <button type="submit" class="btn btn-outline-success" id="addNotebook">Add Notebook</button>
        </div>
    </form>
</div>