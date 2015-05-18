package simulife.server;


public class GuiObject {

	//private Map<String,Object> fields; 
	
	private int id;
	private int parentId;
	private int x,y,z;
	//private int size;
	private int type;
	private int func;

	//Empty CTOR
	public GuiObject() {
		super();
	}
	
	//Fields CTOR
	public GuiObject(int id, int parentId, int x, int y, int z, int func, int type) {
		super();
		this.id = id;
		this.parentId = parentId;
		this.x = x;
		this.y = y;
		this.z = z;
		this.type = type;
		this.func = func;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getZ() {
		return z;
	}

	public void setZ(int z) {
		this.z = z;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getFunc() {
		return func;
	}

	public void setFunc(int func) {
		this.func = func;
	}

	@Override
	public String toString() {
		return "GuiObject [id=" + id + ", " + 
				", type=" + type + ", func=" + func
				+ ", x=" + x + ", y=" + y + ", z=" + z + "]";
	}


}
